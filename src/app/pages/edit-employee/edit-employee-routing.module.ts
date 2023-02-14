import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/can-active-guard.service';

import { EditEmployeeComponent } from './edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEmployeeRoutingModule {}
