import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';

import { VendaService } from '../../services/venda.service';
import { MessageService } from '../messages/message.service';

import { Venda } from '../../models/venda.model';

import { getTableSettings } from '../tables/table-settings.function';

@Component({
  selector: 'ngx-venda',
  templateUrl: 'venda.component.html',
  styleUrls: ['venda.component.scss'],
})
export class VendaComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  tableSettings: any;

  vendas: Venda[];

  loading: boolean;

  constructor(
    private vendaService: VendaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.setTableSettings();
    this.buscarVendas();
  }

  setTableSettings() {
    this.tableSettings = getTableSettings({
      cliente: {
        title: 'Cliente',
        type: 'string',
        valuePrepareFunction: cliente => cliente.nome,
      },
      produto: {
        title: 'Produto',
        type: 'string',
        valuePrepareFunction: produto => produto.nome,
      },
      filial: {
        title: 'Filial',
        type: 'string',
        valuePrepareFunction: filial => filial.nome,
      },
      valorUnitario: {
        title: 'Valor Unitário',
        type: 'number',
        valuePrepareFunction: valor => CurrencyPipe.prototype.transform(valor, 'BRL', true, '1.2-2'),
      },
      qtd: {
        title: 'Quantidade',
        type: 'number',
      },
      valorTotal: {
        title: 'Valor Unitário',
        type: 'number',
        valuePrepareFunction: valor => CurrencyPipe.prototype.transform(valor, 'BRL', true, '1.2-2'),
      },
    }, false);
  }

  buscarVendas() {
    this.loading = true;
    this.vendaService.buscarVendas().subscribe(vendas => {
      vendas.forEach(venda => {
        venda['valorTotal'] = venda.qtd * venda.valorUnitario;
      });
      this.vendas = vendas;
      this.source.load(vendas);
      this.loading = false;
    });
  }

  efetuarNovaVenda() {
    this.router.navigate(['efetuar'], { relativeTo: this.route });
  }
}
