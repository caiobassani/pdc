import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendaComponent } from './venda.component';
import { EfetuarVendaComponent } from './efetuar-venda.component';

const routes: Routes = [{
  path: '',
  component: VendaComponent,
}, {
  path: 'efetuar',
  component: EfetuarVendaComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaRoutingModule { }

export const routedComponents = [
  VendaComponent,
  EfetuarVendaComponent,
];
