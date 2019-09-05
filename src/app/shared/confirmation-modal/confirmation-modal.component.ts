import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  bodyText: string;
  resolve = false;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  public close() {
    this.bsModalRef.hide();
  }

  public confirm() {
    this.resolve = true;
    this.bsModalRef.hide();
  }
}
