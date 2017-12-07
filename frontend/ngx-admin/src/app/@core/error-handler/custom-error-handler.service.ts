import { Injectable, Injector, ErrorHandler as AngularErrorHandler } from '@angular/core';

import { BackendStatusService } from '../backend-status/backend-status.service';

import { MessageService } from '../../pages/messages/message.service';

@Injectable()
export class CustomErrorHandlerService implements AngularErrorHandler {

  constructor(
    private injector: Injector,
  ) { }

  get messageService(): MessageService {
    return this.injector.get(MessageService);
  }

  get backendStatusService(): BackendStatusService {
    return this.injector.get(BackendStatusService);
  }

  handleError(error: any) {
    if (this.isBackendError(error)) {
      if (error.status === 0) {
        this.backendStatusService.setAsOffline();
      } else {
        const msg = error.json().mensagem;
        this.messageService.showMessage({ type: 'error', title: 'Erro', body: msg });
      }
    }
    console.error(error);
  }

  isBackendError(error: any): boolean {
    return error.hasOwnProperty('url') && error.hasOwnProperty('status') && !error.ok;
  }
}
