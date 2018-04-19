import { Injectable } from '@angular/core';
import { ModalComponent } from '../_components/modal/modal.component';

export class ModalService {
  private modals: Array<ModalComponent>;

  constructor() {
    this.modals = [];
  }

  findModal(modalId: string): ModalComponent {
    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }


  add(newModal: ModalComponent) {

    const modal = this.findModal(newModal.modalId);

    // Delete existing to replace the modal
    if (modal) {
      this.modals.splice(this.modals.indexOf(modal), 1);
    }
    // add modal to array of active modals
    this.modals.push(newModal);
  }

  remove(id: string) {

    const modalToRemove = this.findModal(id);
    // remove modal from array of active modals
    this.modals.splice(this.modals.indexOf(modalToRemove), 1);

  }

  show(id: string) {
    // open modal specified by id
    const modal = this.findModal(id);
    modal.show();
  }

  hide(id: string) {
    // close modal specified by id
    const modal = this.findModal(id);
    modal.hide();
  }
}
