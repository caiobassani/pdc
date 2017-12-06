import { Cliente } from './cliente.model';
import { Produto } from './produto.model';
import { Filial } from './filial.model';

export class Venda {
    idVenda: number;
    cliente: Cliente;
    produto: Produto;
    filial: Filial;
    qtd: number;
    valorUnitario: number;
}
