import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  maxDate;
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
  addEmployeeForm = this.fb.group({
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
    private data: DataService
  ) {}

  ngOnInit() {
    this.getMaxDate();
  }

  getMaxDate() {
    this.maxDate = new Date();
  }

  addEmployee() {
    console.log(this.addEmployeeForm.valid);
    if (this.addEmployeeForm.valid) {
      this.data.setAddEmployee = this.addEmployeeForm.value;
      this.dom.showToastMessage('Berhasil Menambah Employee');
      this.addEmployeeForm.reset();
      this.router.navigate(['employee-list']);
    }
  }
}
