import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ClienteService } from '../../services/cliente.service';
import { FilialService } from '../../services/filial.service';
import { MessageService } from '../messages/message.service';

import { Cliente } from '../../models/cliente.model';
import { Filial } from '../../models/filial.model';

import { ModalService } from '../modals/modal.service';

import { getTableSettings } from '../tables/table-settings.function';

@Component({
  selector: 'ngx-cliente',
  templateUrl: 'cliente.component.html',
})
export class ClienteComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  tableSettings: any;
  loaded: boolean;

  filiais: Filial[];
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private filialService: FilialService,
    private messageService: MessageService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.buscarFiliais();
  }

  setTableSettings(filiais: Filial[]) {
    this.tableSettings = getTableSettings({
      nome: {
        title: 'Nome',
        type: 'string',
      },
      filial: {
        title: 'Filial',
        type: 'string',
        valuePrepareFunction: filial => filial.nome,
        editable: false,
        editor: {
          type: 'list',
          config: {
            list: filiais.map(f => ({ title: f.nome, value: f.idFilial })),
          },
        },
      },
    });
  }

  buscarFiliais() {
    this.filialService.buscarFiliais().subscribe(filiais => {
      this.filiais = filiais;
      this.setTableSettings(filiais);
      this.buscarClientes();
    });
  }

  buscarClientes() {
    this.loaded = false;
    this.clienteService.buscarClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.source.load(clientes);
      this.loaded = true;
    });
  }

  validar(cliente: Cliente): boolean {
    if (!cliente.nome) {
      this.messageService.showMessage({ type: 'error', title: 'Erro', body: 'Por favor, digite um nome.' });
      return false;
    }
    if (!cliente.filial) {
      this.messageService.showMessage({ type: 'error', title: 'Erro', body: 'Por favor, selecione uma filial.' });
      return false;
    }
    return true;
  }

  onCreateConfirm(event): void {
    const idFilial = +event.newData.filial;
    const filial = this.filiais.find(f => f.idFilial === idFilial);
    const cliente: Cliente = { idCliente: null, nome: event.newData.nome, filial: filial };
    if (!this.validar(cliente)) {
      event.confirm.reject();
      return;
    }
    this.clienteService.cadastrarCliente(cliente).subscribe(success => {
      event.confirm.resolve();
      this.messageService.showMessage({
        type: 'success',
        title: 'Sucesso',
        body: 'Cliente cadastrado com sucesso!',
      });
      this.buscarClientes();
    }, error => {
      event.confirm.reject();
      throw error;
    });
  }

  onEditConfirm(event): void {
    const cliente = event.newData;
    if (!this.validar(cliente)) {
      event.confirm.reject();
      return;
    }
    this.clienteService.alterarCliente(cliente).subscribe(success => {
      event.confirm.resolve();
      this.messageService.showMessage({
        type: 'success',
        title: 'Sucesso',
        body: 'Cliente alterado com sucesso!',
      });
      this.buscarClientes();
    }, error => {
      event.confirm.reject();
      throw error;
    });
  }

  onDeleteConfirm(event): void {
    const idCliente = event.data.idCliente;
    this.modalService.showModal('Remover cliente', 'Deseja realmente remover este cliente?').then(
      onFulfilled => {
        this.clienteService.removerCliente(idCliente).subscribe(success => {
          event.confirm.resolve();
          this.messageService.showMessage({
            type: 'success',
            title: 'Sucesso',
            body: 'Cliente removido com sucesso!',
          });
          this.buscarClientes();
        }, error => {
          event.confirm.reject();
          throw error;
        });
      },
      onRejected => event.confirm.reject(),
    );
  }
}
