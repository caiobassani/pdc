/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClienteService } from './services/cliente.service';
import { FilialService } from './services/filial.service';
import { ProdutoService } from './services/produto.service';
import { VendaService } from './services/venda.service';
import { MessageService } from './pages/messages/message.service';

import { CustomErrorHandlerService } from './@core/error-handler/custom-error-handler.service';
import { BackendStatusService } from './@core/backend-status/backend-status.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ClienteService,
    FilialService,
    ProdutoService,
    VendaService,
    MessageService,
    BackendStatusService,
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
  ],
})
export class AppModule {
}
