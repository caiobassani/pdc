import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

import { MENU_ITEMS } from './pages-menu';
import { MessageService } from './messages/message.service';
import { BackendStatusService } from '../@core/backend-status/backend-status.service';

@Component({
  selector: 'ngx-pages',
  template: `
    <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
    <div class="alert alert-danger connection-lost-message" *ngIf="!isOnline">
      Conexão perdida com o servidor. Tentando reconectar...
    </div>
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
  styles: [`
    .connection-lost-message {
      margin-bottom: 0;
      border-radius: 0;
      text-align: center;
    }
  `],
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  toasterConfig: ToasterConfig;
  isOnline: boolean = true;

  constructor(
    private messageService: MessageService,
    private backendStatusService: BackendStatusService,
    private toasterService: ToasterService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.messageService.listen().subscribe(message => {
      this.showMessage(message.type, message.title, message.body);
    });
    this.backendStatusService.listenStatus().subscribe(status => {
      this.isOnline = status.online;
    });
  }

  showMessage(type: string, title: string, body: string) {
    this.toasterConfig = this.toasterConfig || new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'fade',
      limit: 5,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
    setTimeout(_ => this.cdr.detectChanges(), 0);
  }
}
