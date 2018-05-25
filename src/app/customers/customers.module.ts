import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';


@NgModule({
  declarations: [ CustomersComponent ],
  imports: [
    SharedModule,
    MatTableModule,
		MatProgressSpinnerModule,
    CustomersRoutingModule
  ],
  exports: [ CustomersComponent ]
})
export class CustomersModule { }
