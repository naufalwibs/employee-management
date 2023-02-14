import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { EditEmployeeComponent } from './edit-employee.component';
import { EditEmployeeRoutingModule } from './edit-employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EditEmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [EditEmployeeComponent],
})
export class EditEmployeePageModule {}
