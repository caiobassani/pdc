import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'cliente',
    loadChildren: './cliente/cliente.module#ClienteModule',
  }, {
    path: 'produto',
    loadChildren: './produto/produto.module#ProdutoModule',
  }, {
    path: 'venda',
    loadChildren: './venda/venda.module#VendaModule',
  }, {
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
