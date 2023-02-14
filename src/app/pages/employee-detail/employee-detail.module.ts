import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeDetailRoutingModule } from './employee-detail-routing.module';

@NgModule({
  imports: [CommonModule, EmployeeDetailRoutingModule, SharedModule],
  declarations: [EmployeeDetailComponent],
})
export class EmployeeDetailPageModule {}
