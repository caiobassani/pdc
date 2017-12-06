import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { VendaRoutingModule, routedComponents } from './venda-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    VendaRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class VendaModule { }
