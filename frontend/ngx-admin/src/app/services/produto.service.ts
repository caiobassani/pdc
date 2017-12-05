import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Produto } from "../models/produto.model";
import { ErrorMessage } from "../models/error-message.model";

@Injectable()
export class ProdutoService {

    constructor(
        private http: Http
    ) { }

    buscarProdutos(nome:string): Observable<Produto[]> {
        return this.http.get(`${environment.backendPath}/produto/buscarProdutos/${nome}`)
            .map((res: Response) => res.json() || []);
    }

    buscarTodosProdutos(): Observable<Produto[]> {
        return this.http.get(`${environment.backendPath}/produto/buscarProdutos`)
            .map((res: Response) => res.json() || []);
    }

    cadastrarProduto(produto:Produto): Observable<ErrorMessage> {
        return this.http.post(`${environment.backendPath}/produto/cadastrarProduto/`, produto)
            .map((res: Response) => res.json() || null);
    }

    removerProduto(idProduto:number): Observable<ErrorMessage> {
        return this.http.delete(`${environment.backendPath}/produto/removerProduto/${idProduto}`)
            .map((res: Response) => res.json() || null);
    }

    alterarProduto(produto:Produto): Observable<ErrorMessage> {
        return this.http.put(`${environment.backendPath}/produto/alterarProduto/`, produto)
            .map((res: Response) => res.json() || null);
    }
}