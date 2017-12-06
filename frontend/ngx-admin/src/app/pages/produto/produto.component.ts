import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';

import { ProdutoService } from '../../services/produto.service';
import { MessageService } from '../messages/message.service';

import { Produto } from '../../models/produto.model';

import { ModalService } from '../modals/modal.service';

import { getTableSettings } from '../tables/table-settings.function';

@Component({
  selector: 'ngx-produto',
  templateUrl: 'produto.component.html',
})
export class ProdutoComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  tableSettings: any;
  loaded: boolean;

  produtos: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.setTableSettings();
    this.buscarProdutos();
  }

  setTableSettings() {
    this.tableSettings = getTableSettings({
      nome: {
        title: 'Nome',
        type: 'string',
      },
      valor: {
        title: 'Valor Unitário',
        type: 'number',
        valuePrepareFunction: valor => CurrencyPipe.prototype.transform(valor, 'BRL', true, '1.2-2'),
      },
      qtdEstoque: {
        title: 'Quantidade em estoque',
        type: 'number',
      },
    });
  }

  buscarProdutos() {
    this.loaded = false;
    this.produtoService.buscarTodosProdutos().subscribe(produtos => {
      this.produtos = produtos;
      this.source.load(produtos);
      this.loaded = true;
    });
  }

  validar(produto: Produto): boolean {
    const isNumeric = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    if (!produto.nome) {
      this.messageService.showMessage({ type: 'error', title: 'Erro', body: 'Por favor, digite um nome.' });
      return false;
    }
    if (!produto.valor || !isNumeric(produto.valor)) {
      this.messageService.showMessage({ type: 'error', title: 'Erro', body: 'Por favor, digite um valor válido.' });
      return false;
    }
    if (!produto.qtdEstoque || !isNumeric(produto.qtdEstoque) || produto.qtdEstoque < 0) {
      this.messageService.showMessage({
        type: 'error', title: 'Erro', body: 'Por favor, digite um quantidade em estoque válida.',
      });
      return false;
    }
    return true;
  }

  onCreateConfirm(event): void {
    const produto: Produto = event.newData;
    produto.idProduto = null;
    if (!this.validar(produto)) {
      event.confirm.reject();
      return;
    }
    this.produtoService.cadastrarProduto(produto).subscribe(success => {
      event.confirm.resolve();
      this.messageService.showMessage({
        type: 'success',
        title: 'Sucesso',
        body: 'Produto cadastrado com sucesso!',
      });
      this.buscarProdutos();
    }, error => {
      event.confirm.reject();
      throw error;
    });
  }

  onEditConfirm(event): void {
    const produto = event.newData;
    if (!this.validar(produto)) {
      event.confirm.reject();
      return;
    }
    this.produtoService.alterarProduto(produto).subscribe(success => {
      event.confirm.resolve();
      this.messageService.showMessage({
        type: 'success',
        title: 'Sucesso',
        body: 'Produto alterado com sucesso!',
      });
      this.buscarProdutos();
    }, error => {
      event.confirm.reject();
      throw error;
    });
  }

  onDeleteConfirm(event): void {
    const idProduto = event.data.idProduto;
    this.modalService.showModal('Remover produto', 'Deseja realmente remover este produto?').then(
      onFulfilled => {
        this.produtoService.removerProduto(idProduto).subscribe(success => {
          event.confirm.resolve();
          this.messageService.showMessage({
            type: 'success',
            title: 'Sucesso',
            body: 'Produto removido com sucesso!',
          });
          this.buscarProdutos();
        }, error => {
          event.confirm.reject();
          throw error;
        });
      },
      onRejected => event.confirm.reject(),
    );
  }
}
