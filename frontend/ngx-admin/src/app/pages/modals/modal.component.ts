import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-secondary" (click)="closeModal()">Sim</button>
      <button class="btn btn-md btn-primary" (click)="dismissModal()">Não</button>
    </div>
  `,
})
export class ModalComponent {

  modalHeader: string;
  modalContent: string;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  closeModal() {
    this.activeModal.close();
  }

  dismissModal() {
    this.activeModal.dismiss();
  }
}
