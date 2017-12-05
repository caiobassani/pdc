import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ClienteService } from '../../../services/cliente.service';
import { FilialService } from '../../../services/filial.service';

import { Cliente } from '../../../models/cliente.model';
import { Filial } from '../../../models/filial.model';

@Component({
  selector: 'ngx-cliente-list',
  templateUrl: 'cliente-list.component.html',
  styleUrls: ['cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {

  settings: any;
  source: LocalDataSource = new LocalDataSource();
  loaded: boolean;

  filiais: Filial[];
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private filialService: FilialService,
  ) { }

  ngOnInit() {
    this.buscarFiliais();
  }

  buscarFiliais() {
    this.filialService.buscarFiliais().subscribe(filiais => {
      this.filiais = filiais;
      this.setSettings(filiais);
      this.buscarClientes();
    });
  }

  buscarClientes() {
    this.loaded = false;
    this.clienteService.buscarClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.source.load(clientes.map(c => ({ nome: c.nome, filial: c.filial.nome })));
      this.loaded = true;
    });
  }

  setSettings(filiais: Filial[]) {
    this.settings = {
      mode: 'inline',
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        nome: {
          title: 'Nome',
          type: 'string',
        },
        filial: {
          title: 'Filial',
          type: 'string',
          editor: {
            type: 'list',
            config: {
              list: filiais.map(f => ({ title: f.nome, value: f.idFilial })),
            },
          },
        },
      },
    };
  }

  onCreateConfirm(event): void {
    const idFilial = +event.newData.filial;
    const filial = this.filiais.find(f => f.idFilial === idFilial);
    const cliente: Cliente = { idCliente: null, nome: event.newData.nome, filial: filial };
    this.clienteService.cadastrarCliente(cliente).subscribe(success => {
      event.confirm.resolve();
      this.buscarClientes();
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Deseja realmente remover este cliente?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
