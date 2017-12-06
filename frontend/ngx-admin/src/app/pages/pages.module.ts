import { NgModule } from '@angular/core';

import { ToasterModule, ToasterService } from 'angular2-toaster';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ModalService } from './modals/modal.service';
import { ModalComponent } from './modals/modal.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  ModalComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ToasterModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    ToasterService,
    ModalService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class PagesModule {
}
