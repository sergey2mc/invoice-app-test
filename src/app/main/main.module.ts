import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [ MainComponent ],
  imports: [
    SharedModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MainRoutingModule
  ],
  exports: [ MainComponent ]
})
export class MainModule { }
