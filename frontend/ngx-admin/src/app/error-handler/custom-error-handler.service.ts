import { Injectable, Injector, ErrorHandler as AngularErrorHandler } from '@angular/core';

import { MessageService } from '../pages/messages/message.service';

@Injectable()
export class CustomErrorHandlerService implements AngularErrorHandler {

  constructor(
    private injector: Injector,
  ) { }

  get messageService(): MessageService {
    return this.injector.get(MessageService);
  }

  handleError(error: any) {
    if (this.isBackendError(error)) {
      console.log(error);
      const msg = error.json().mensagem;
      this.messageService.showMessage({ type: 'error', title: 'Erro', body: msg });
    }
    console.error(error);
  }

  isBackendError(error: any): boolean {
    return error.status >= 300 && error.url && !error.ok;
  }
}
