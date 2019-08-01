import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
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
