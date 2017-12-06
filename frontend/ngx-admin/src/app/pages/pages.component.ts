import { Component, OnInit } from '@angular/core';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

import { MENU_ITEMS } from './pages-menu';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'ngx-pages',
  template: `
    <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  toasterConfig: ToasterConfig;

  constructor(
    private messageService: MessageService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.messageService.listen().subscribe(message => {
      this.showMessage(message.type, message.title, message.body);
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
  }
}
