import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    FormsModule,
    SharedModule,
    MatIconModule,
  ],
  declarations: [EmployeeListComponent],
})
export class EmployeeListPageModule {}
