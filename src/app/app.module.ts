import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NotFoundModule } from './not-found/not-found.module';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    NotFoundModule,
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
