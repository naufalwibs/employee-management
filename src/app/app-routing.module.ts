import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/can-active-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'employee-list',
    loadChildren: () =>
      import('./pages/employee-list/employee-list.module').then(
        (m) => m.EmployeeListPageModule
      ),
  },
  {
    path: 'add-employee',
    loadChildren: () =>
      import('./pages/add-employee/add-employee.module').then(
        (m) => m.AddEmployeePageModule
      ),
  },
  {
    path: 'employee-detail/:id',
    loadChildren: () =>
      import('./pages/employee-detail/employee-detail.module').then(
        (m) => m.EmployeeDetailPageModule
      ),
  },
  {
    path: 'edit-employee/:id',
    loadChildren: () =>
      import('./pages/edit-employee/edit-employee.module').then(
        (m) => m.EditEmployeePageModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
