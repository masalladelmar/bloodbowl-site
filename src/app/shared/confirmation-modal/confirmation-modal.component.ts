import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() bodyText: string;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  public close() {
    this.modalService.setOutput(false);
    this.modalService.destroy();
  }

  public confirm() {
    this.modalService.setOutput(true);
    this.modalService.destroy();
  }
}
