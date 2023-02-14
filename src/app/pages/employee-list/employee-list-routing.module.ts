import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/can-active-guard.service';

import { EmployeeListComponent } from './employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeListRoutingModule {}
