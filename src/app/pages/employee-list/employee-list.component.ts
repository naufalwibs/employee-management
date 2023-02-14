import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import EmployeeList from 'src/app/data/employee-list.json';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DomService } from 'src/app/services/dom.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  employeeList = [];
  employeeListPpv = [];
  filteredEmployee = [];
  pagePerView = 20;
  pagePerViewOption = [20, 50, 100];
  currentPage = 1;
  maxPage;
  pageLimit;
  search;
  orderType = 'DESC';
  sortType = 'username,ASC';
  showModal = false;
  selectedEmployeeId;

  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DataService,
    private dom: DomService
  ) {}

  ngOnInit() {
    this.getEmployeeList();
    this.getPaginatedData();
    this.getMaxPage();

    if (!this.search && this.data.lastSearch) {
      this.search = this.data.lastSearch;
      this.searchFilter();
    }

    this.subs.add(
      this.data.addEmployee.subscribe((employee) => {
        if (employee) {
          employee.id = new Date().toISOString();
          this.employeeList.unshift(employee);
          this.getPaginatedData();
          this.getMaxPage();
          this.data.setAddEmployee = null;
        }
      })
    );

    this.subs.add(
      this.data.editEmployee.subscribe((employee) => {
        if (employee) {
          this.employeeList.find((emp, i) => {
            if (emp.id == employee.id) {
              this.employeeList[i] = employee;
            }
          });
          this.getPaginatedData();
          this.getMaxPage();
          this.data.setEditEmployee = null;
        }
      })
    );
  }

  getEmployeeList() {
    this.employeeList = EmployeeList;
  }

  changePagePerView(val = '') {
    this.getMaxPage();
    if (this.currentPage > this.maxPage) this.currentPage = this.maxPage;
    this.getPaginatedData();
  }

  goToNextPage() {
    this.currentPage += 1;
    this.changePagePerView();
  }

  goToPreviousPage() {
    this.currentPage -= 1;
    this.changePagePerView();
  }

  getPaginatedData() {
    const startIndex = this.currentPage * this.pagePerView - this.pagePerView;
    const endIndex = startIndex + this.pagePerView;
    this.employeeListPpv = [...this.employeeList.slice(startIndex, endIndex)];
  }

  getMaxPage() {
    this.maxPage = Math.ceil(this.employeeList.length / this.pagePerView);
  }

  goToAddEmployee() {
    this.router.navigate(['add-employee']);
  }

  goToEmployeeDetail(employeeId) {
    this.data.lastSearch = this.search;
    this.data.updatedEmployeeList = this.employeeList;
    this.router.navigateByUrl(`/employee-detail/${employeeId}`);
  }

  searchFilter() {
    this.filteredEmployee = [...this.employeeList].filter((employee) => {
      if (
        employee.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.search.toLowerCase())
      ) {
        return employee;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  deleteEmployee(decision) {
    if (decision == 'yes') {
      if (this.search) {
        this.filteredEmployee = this.filteredEmployee.filter(
          (employee) => employee.id !== this.selectedEmployeeId
        );
      } else {
        this.employeeListPpv = this.employeeListPpv.filter(
          (employee) => employee.id !== this.selectedEmployeeId
        );
      }
      this.employeeList = this.employeeList.filter(
        (employee) => employee.id !== this.selectedEmployeeId
      );
      this.dom.showToastMessage('Berhasil Dihapus');
    }

    this.setShowModal();
  }

  openDeletePopUp(employeeId) {
    this.setShowModal();
    this.selectedEmployeeId = employeeId;
  }

  editEmployee(employeeId) {
    this.router.navigateByUrl(`/edit-employee/${employeeId}`);
  }

  sortBy(query) {
    const valSort = this.sortType.split(',');
    this.orderType = valSort[1];

    if (this.orderType === 'ASC') {
      const sortEmployee = !this.search
        ? this.employeeListPpv
        : this.filteredEmployee;
      sortEmployee.sort((a, b) => {
        const qA = a[valSort[0]];
        const qB = b[valSort[0]];

        if (qA < qB) {
          return -1;
        }

        if (qB > qA) {
          return 1;
        }

        return 0;
      });
    } else if (this.orderType === 'DESC') {
      const sortEmployee = !this.search
        ? this.employeeListPpv
        : this.filteredEmployee;
      sortEmployee.sort((a, b) => {
        const qA = a[valSort[0]];
        const qB = b[valSort[0]];

        if (qA > qB) {
          return -1;
        }

        if (qB < qA) {
          return 1;
        }

        return 0;
      });
    }
  }

  setShowModal() {
    this.showModal = !this.showModal;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
