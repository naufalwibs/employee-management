import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    FormsModule,
    SharedModule,
    MatIconModule,
  ],
  declarations: [NotFoundComponent],
})
export class NotFoundPageModule {}
