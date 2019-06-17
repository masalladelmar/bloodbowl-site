import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Position } from 'src/app/models/position.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { SkillType } from 'src/app/models/skill.model';

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
    });

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
    // document.getElementsByClassName('modal')[0].classList.remove('modal-lg');
    this.modalService.destroy();
  }

  public confirm() {
    this.modalService.setOutput(true);
    document.getElementById('modal-div').style.maxWidth = '';
    // document.getElementsByClassName('modal')[0].classList.remove('modal-lg');
    this.modalService.destroy();
  }
}
