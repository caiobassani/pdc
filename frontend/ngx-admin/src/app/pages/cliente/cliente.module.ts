import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClienteRoutingModule, routedComponents } from './cliente-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ClienteRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ClienteModule { }
