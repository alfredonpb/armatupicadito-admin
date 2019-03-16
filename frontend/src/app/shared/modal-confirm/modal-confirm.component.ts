import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
   selector: 'modal-confirm',
   templateUrl: 'modal-confirm.html'
})

export class ModalConfirmComponent implements OnInit {
   @ViewChild('modalConfirm') modalConfirm: ModalDirective;
   @Output() confirmOperation = new EventEmitter();
   @Output() declineOperation = new EventEmitter();
   operation: string;

   constructor() { }

   ngOnInit() { }

   /** show modal */
   showModal(operation: string) {
      this.operation = operation;
      this.modalConfirm.show();
   }

   /** hide modal */
   hideModal() {
      this.modalConfirm.hide();
   }

   /** decline operation */
   decline() {
      this.declineOperation.emit();
      this.hideModal();
   }

   /** confirm operation */
   confirm() {
      this.confirmOperation.emit();
      this.hideModal();
   }

}