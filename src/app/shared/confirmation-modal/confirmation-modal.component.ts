import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() inputs: string;
  bodyText: string;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    const input = JSON.parse(this['inputs']);
    this.bodyText = input.bodyText;
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
