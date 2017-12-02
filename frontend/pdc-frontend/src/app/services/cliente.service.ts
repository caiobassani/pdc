import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ClienteService {

    constructor(
        private http: Http
    ) { }

    buscarClientes(): Observable<Cliente[]> {
        return this.http.get(`${environment.backendPath}/cliente/buscarClientes`)
            .map((res: Response) => res.json() || []);
    }
}