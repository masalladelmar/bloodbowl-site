import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Position } from 'src/app/models/position.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { SkillType } from 'src/app/models/skill.model';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  @Input() inputs: string;
  position: Position;
  positionform: FormGroup;
  title: string;
  skilltypes: SkillType[];

  constructor(
    private modalService: ModalService,
    private commonsService: CommonsService,
    private fb: FormBuilder
  ) {
    this.positionform = this.fb.group({
      name: ['', Validators.required],
      limit: ['', Validators.required],
      price: ['', Validators.required],
      ma: ['', Validators.required],
      st: ['', Validators.required],
      ag: ['', Validators.required],
      av: ['', Validators.required],
      skills: [''],
      normal: new FormArray([]),
      doubles: new FormArray([])
      },
      { validator: this.validateTypes }
    );

    document.getElementById('modal-div').style.maxWidth = '960px';
  }

  private buildTypes(type: string) {
    const skillsSelected = this.position ? this.position[type].split(',') : [];
    this.skilltypes.forEach(skill => {
      const control = new FormControl(skillsSelected.find(el => el === skill.link) ? true : false);
      (this.positionform.controls[type] as FormArray).push(control);
    });
  }

  ngOnInit() {
    const input = JSON.parse(this['inputs']);
    this.position = input.position;
    this.skilltypes = input.skilltypes;

    this.buildTypes('normal');
    this.buildTypes('doubles');

    if (this.position) {
      this.title = 'Editar';
      this.positionform.controls.name.setValue(this.position.name);
      this.positionform.controls.limit.setValue(this.position.limit);
      this.positionform.controls.price.setValue(this.position.price);
      this.positionform.controls.ma.setValue(this.position.ma);
      this.positionform.controls.st.setValue(this.position.st);
      this.positionform.controls.ag.setValue(this.position.ag);
      this.positionform.controls.av.setValue(this.position.av);
      this.positionform.controls.skills.setValue(this.position.skills);
    } else {
      this.title = 'Nueva';
    }
  }

  public close() {
    this.modalService.setOutput(false);
    document.getElementById('modal-div').style.maxWidth = '';
    this.modalService.destroy();
  }

  public onSubmit() {
    if (this.positionform.valid) {
      this.modalService.setOutput(true);
      document.getElementById('modal-div').style.maxWidth = '';
      this.modalService.destroy();
    } else {
      this.commonsService.handleError('Hay campos sin rellenar');
    }
  }

  get name() {
    return this.positionform.get('name');
  }
  get limit() {
    return this.positionform.get('limit');
  }
  get price() {
    return this.positionform.get('price');
  }
  get ma() {
    return this.positionform.get('ma');
  }
  get st() {
    return this.positionform.get('st');
  }
  get ag() {
    return this.positionform.get('ag');
  }
  get av() {
    return this.positionform.get('av');
  }
  get normal() {
    return this.positionform.get('normal').value;
  }
  get doubles() {
    return this.positionform.get('doubles').value;
  }

  validateTypes(group: FormGroup): any {
    if (group) {
      // Validar que la suma de ambos arrays es 6 entre los 2 y que no se repiten
      const totalNormal = this.normal ? this.normal
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0) : 0;

      const totalDoubles = this.doubles ? this.doubles
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0) : 0;

      if (totalNormal + totalDoubles > 6 || totalNormal + totalDoubles < 5) {
        return { wrongNumber: true };
      }

      return null;
    }

    return null;
  }
}
