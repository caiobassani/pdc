import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Message } from './message.model';

@Injectable()
export class MessageService {

  messageSubject: Subject<Message> = new Subject<Message>();

  constructor() { }

  showMessage(message: Message) {
    this.messageSubject.next(message);
  }

  listen(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}
