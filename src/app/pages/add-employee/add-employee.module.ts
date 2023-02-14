import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { AddEmployeeComponent } from './add-employee.component';
import { AddEmployeeRoutingModule } from './add-employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AddEmployeeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddEmployeeComponent],
})
export class AddEmployeePageModule {}
