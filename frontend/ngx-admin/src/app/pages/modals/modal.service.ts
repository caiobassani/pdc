import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {

  constructor(
    private modalService: NgbModal,
  ) { }

  showModal(header: string, content: string): Promise<any> {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
    return activeModal.result;
  }
}
