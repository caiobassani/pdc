import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject, Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class BackendStatusService {

  backendStatusSubject: Subject<{ online: boolean }> = new Subject<{ online: boolean }>();
  interval: any;

  constructor(
    private http: Http,
  ) { }

  setAsOnline(): void {
    this.backendStatusSubject.next({ online: true });
  }

  setAsOffline(): void {
    this.backendStatusSubject.next({ online: false });
    this.tryReconnection();
  }

  listenStatus(): Observable<{ online: boolean }> {
    return this.backendStatusSubject.asObservable();
  }

  tryReconnection(): void {
    setTimeout(_ => {
      this.http.options(`${environment.backendPath}/status`).subscribe(
        success => {
          this.setAsOnline();
        },
        error => {
          this.tryReconnection();
        },
      );
    }, 3000);
  }
}
