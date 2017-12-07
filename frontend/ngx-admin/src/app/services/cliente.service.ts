import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ClienteService {

    constructor(
        private http: Http,
    ) { }

    buscarClientes(): Observable<Cliente[]> {
        return this.http.get(`${environment.backendPath}/cliente/buscarClientes`)
            .map((res: Response) => res.json() || []);
    }

    buscarClientesByNome(nome: string): Observable<Cliente[]> {
        return this.http.get(`${environment.backendPath}/cliente/buscarClientes/${nome}`)
            .map((res: Response) => res.json() || []);
    }

    cadastrarCliente(cliente: Cliente): Observable<boolean> {
        return this.http.post(`${environment.backendPath}/cliente/cadastrarCliente`, cliente)
            .map((res: Response) => res.ok);
    }

    removerCliente(idCliente: number): Observable<boolean> {
        return this.http.delete(`${environment.backendPath}/cliente/removerCliente/${idCliente}`)
            .map((res: Response) => res.ok);
    }

    alterarCliente(cliente: Cliente): Observable<boolean> {
        return this.http.put(`${environment.backendPath}/cliente/alterarCliente`, cliente)
            .map((res: Response) => res.ok);
    }
}
