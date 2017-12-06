import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Venda } from '../models/venda.model';
import { ErrorMessage } from '../models/error-message.model';

@Injectable()
export class VendaService {

    constructor(
        private http: Http,
    ) { }

    buscarVendas(): Observable<Venda[]> {
        return this.http.get(`${environment.backendPath}/venda/buscarVendas`)
            .map((res: Response) => res.json() || []);
    }

    efetuarVenda(venda: Venda): Observable<ErrorMessage> {
        return this.http.post(`${environment.backendPath}/venda/efetuarVenda/`, venda)
            .map((res: Response) => res.json() || null);
    }
}
