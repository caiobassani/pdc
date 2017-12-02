import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'rxjs/Rx';

import { AppComponent } from './app.component';
import { ClienteService } from './services/cliente.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    ClienteService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
