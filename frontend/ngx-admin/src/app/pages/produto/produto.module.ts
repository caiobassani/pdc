import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ProdutoRoutingModule, routedComponents } from './produto-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ProdutoRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ProdutoModule { }
