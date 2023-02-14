import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';
import EmployeList from 'src/app/data/employee-list.json';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  employee;
  employeeId;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        this.employeeId = params.get('id');
        this.findEmployeeById();
      })
    );
  }

  findEmployeeById() {
    if (this.data.updatedEmployeeList)
      this.employee = this.data.updatedEmployeeList.find(
        (employee) => employee.id === this.employeeId
      );
    else
      this.employee = EmployeList.find(
        (employee) => employee.id === this.employeeId
      );
  }

  backToPreviousPage() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
