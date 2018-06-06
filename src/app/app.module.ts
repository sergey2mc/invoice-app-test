import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

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
  providers: [ { provide: APP_BASE_HREF, useValue: '/'} ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
