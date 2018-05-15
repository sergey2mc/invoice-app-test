import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValueLimitModule } from './directives/value-limit-validator/value-limit.module';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    ValueLimitModule
  ]
})
export class SharedModule { }
