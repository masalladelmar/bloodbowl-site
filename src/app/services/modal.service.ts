import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalId = 'modal-div';
  _output: BehaviorSubject<any>;

  constructor(
    private domService: DomService
  ) {
    this._output = new BehaviorSubject<any>(null);
  }

  init(component: any, inputs: object, outputs: object): HTMLElement {
    const componentConfig = {
      inputs: inputs,
      outputs: outputs
    };
    const el = this.domService.appendComponentTo(this.modalId, component, componentConfig);
    document.getElementById(this.modalId).parentElement.classList.add('active');
    return el;
  }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalId).parentElement.classList.remove('active');
  }

  output(): Observable<any> {
    return this._output.asObservable();
  }
}
