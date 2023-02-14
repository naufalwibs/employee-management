import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DomService } from 'src/app/services/dom.service';
import { SubSink } from 'subsink';
import EmployeeList from 'src/app/data/employee-list.json';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  maxDate;
  employee;
  employeeId;
  availableGroup = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliet',
  ];
  editEmployeeForm = this.fb.group({
    id: ['', [Validators.required]],
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    status: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    basicSalary: ['', [Validators.required]],
    group: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dom: DomService,
    private router: Router,
    private data: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMaxDate();

    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        this.employeeId = params.get('id');
        this.findEmployeeById();
      })
    );
  }

  getMaxDate() {
    this.maxDate = new Date();
  }

  findEmployeeById() {
    if (this.data.updatedEmployeeList) {
      this.employee = this.data.updatedEmployeeList.find(
        (emp) => emp.id == this.employeeId
      );
    } else {
      this.employee = EmployeeList.find((emp) => emp.id == this.employeeId);
    }

    this.editEmployeeForm.patchValue(this.employee);
  }

  editEmployee() {
    console.log(this.editEmployeeForm.value);
    if (this.editEmployeeForm.valid) {
      this.data.setEditEmployee = this.editEmployeeForm.value;
      this.dom.showToastMessage('Berhasil Mengedit Data Employee');
      this.editEmployeeForm.reset();
      this.router.navigate(['employee-list']);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
