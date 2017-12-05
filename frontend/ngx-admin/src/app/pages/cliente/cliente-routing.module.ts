import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const routes: Routes = [{
  path: '',
  component: ClienteComponent,
  children: [{
    path: 'list',
    component: ClienteListComponent,
  }, {
    path: 'form',
    component: ClienteFormComponent,
  }, {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule { }

export const routedComponents = [
  ClienteComponent,
  ClienteListComponent,
  ClienteFormComponent,
];
