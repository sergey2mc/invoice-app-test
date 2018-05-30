import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';


@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [
    SharedModule,
    NotFoundRoutingModule
  ],
  exports: [ NotFoundComponent ]
})
export class NotFoundModule { }
