import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletePopUpComponent } from './components/delete-pop-up/delete-pop-up.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { SalaryFormatPipe } from './pipes/salary-format.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ToastMessageComponent, SalaryFormatPipe, DeletePopUpComponent],
  exports: [ToastMessageComponent, SalaryFormatPipe, DeletePopUpComponent],
})
export class SharedModule {}
