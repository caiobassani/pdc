import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { VendaService } from '../../services/venda.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { FilialService } from '../../services/filial.service';
import { MessageService } from '../messages/message.service';

import { Venda } from '../../models/venda.model';
import { Cliente } from '../../models/cliente.model';
import { Produto } from '../../models/produto.model';
import { Filial } from '../../models/filial.model';

class SelectItem {
  label: string;
  value: any;
}

@Component({
  selector: 'ngx-efetuar-venda',
  templateUrl: 'efetuar-venda.component.html',
})
export class EfetuarVendaComponent implements OnInit {

  vendaForm: FormGroup;

  clientes: Cliente[];
  produtos: Produto[];
  filiais: Filial[];

  clientesItem: SelectItem[];
  produtosItem: SelectItem[];
  filiaisItem: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private filialService: FilialService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.setupForm();
    this.loadDropdowns();
  }

  setupForm() {
    this.vendaForm = this.fb.group({
      cliente: ['', Validators.required],
      produto: ['', Validators.required],
      filial: ['', Validators.required],
      qtd: [null, Validators.required],
      valorUnitario: [null, Validators.required],
      valorTotal: [null],
    });
    this.setupFormListeners();
  }

  setupFormListeners(): void {
    const produtoControl = this.vendaForm.get('produto');
    const qtdControl = this.vendaForm.get('qtd');
    const valorUnitarioControl = this.vendaForm.get('valorUnitario');
    const valorTotalControl = this.vendaForm.get('valorTotal');

    produtoControl.valueChanges.subscribe(produto => {
      if (produto) {
        valorUnitarioControl.setValue(this.produtoById(produto).valor);
      } else {
        valorUnitarioControl.setValue(null);
      }
    });
    qtdControl.valueChanges.subscribe(qtd => {
      const valorUnitario = valorUnitarioControl.value;
      if (qtd && valorUnitario) {
        valorTotalControl.setValue(Number(qtd) * Number(valorUnitario));
      } else {
        valorTotalControl.setValue(null);
      }
    });
    valorUnitarioControl.valueChanges.subscribe(valorUnitario => {
      const qtd = qtdControl.value;
      if (qtd && valorUnitario) {
        valorTotalControl.setValue(Number(qtd) * Number(valorUnitario));
      } else {
        valorTotalControl.setValue(null);
      }
    });
  }

  loadDropdowns() {
    this.loadClientes();
    this.loadProdutos();
    this.loadFiliais();
  }

  loadClientes() {
    this.clienteService.buscarClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesItem = clientes.map(c => ({ label: c.nome, value: c.idCliente }));
      this.clientesItem.unshift({ label: 'Selecione...', value: '' });
    });
  }

  loadProdutos() {
    this.produtoService.buscarTodosProdutos().subscribe(produtos => {
      this.produtos = produtos;
      this.produtosItem = produtos.map(p => ({ label: p.nome, value: p.idProduto }));
      this.produtosItem.unshift({ label: 'Selecione...', value: '' });
    });
  }

  loadFiliais() {
    this.filialService.buscarFiliais().subscribe(filiais => {
      this.filiais = filiais;
      this.filiaisItem = filiais.map(f => ({ label: f.nome, value: f.idFilial }));
      this.filiaisItem.unshift({ label: 'Selecione...', value: '' });
    });
  }

  efetuarVenda(vendaFormValue: any, isValid: boolean) {
    if (isValid) {
      const venda: Venda = {
        idVenda: null,
        cliente: this.clienteById(vendaFormValue.cliente),
        produto: this.produtoById(vendaFormValue.produto),
        filial: this.filialById(vendaFormValue.filial),
        qtd: vendaFormValue.qtd,
        valorUnitario: vendaFormValue.valorUnitario,
      };
      this.vendaService.efetuarVenda(venda).subscribe(success => {
        this.messageService.showMessage({
          type: 'success',
          title: 'Sucesso',
          body: 'Venda efetuada com sucesso!',
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  clienteById(id: number): Cliente {
    return this.objFromId<Cliente>(this.clientes, 'idCliente', id);
  }

  produtoById(id: number): Produto {
    return this.objFromId<Produto>(this.produtos, 'idProduto', id);
  }

  filialById(id: number): Filial {
    return this.objFromId<Filial>(this.filiais, 'idFilial', id);
  }

  objFromId<T>(list: T[], property: string, id: number | string): T {
    if (!list || !list.length)
      return null;
    id = +id;
    return list.find(obj => obj[property] === id);
  }
}
