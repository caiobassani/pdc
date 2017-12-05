import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Filial } from '../models/filial.model';
import { environment } from '../../environments/environment';

@Injectable()
export class FilialService {

    constructor(
        private http: Http
    ) { }

    buscarFiliais(): Observable<Filial[]> {
        return this.http.get(`${environment.backendPath}/filial/buscarFiliais`)
            .map((res: Response) => res.json() || []);
    }
}