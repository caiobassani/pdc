import { Component } from '@angular/core';

import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.clienteService.buscarClientes().subscribe(clientes => {
      this.clientes = clientes;
      console.log('Chegou os clientes');
    });
    console.log('Mandou a requisição');
  }

}
