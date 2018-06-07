import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material';

import { LoaderModule } from './loader/loader.module';


@NgModule({
  exports: [
    CommonModule,
    RouterModule,
		MatTableModule,
		MatButtonModule,
    LoaderModule,
  ]
})
export class SharedModule { }
