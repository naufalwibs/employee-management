import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/can-active-guard.service';

import { EmployeeDetailComponent } from './employee-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDetailRoutingModule {}
