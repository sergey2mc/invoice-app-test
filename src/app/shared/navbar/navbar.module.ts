import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { NavbarComponent } from './navbar.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [ NavbarComponent ],
  imports: [
    SharedModule,
    MatButtonModule
  ],
  exports: [ NavbarComponent ]
})
export class NavbarModule { }
