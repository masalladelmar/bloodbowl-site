import { Component, OnInit } from '@angular/core';
import { Position, PositionSkill } from 'src/app/models/position.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonsService } from 'src/app/services/commons.service';
import { PositionsService } from 'src/app/services/positions.service';
import { SkillTypes, Skill } from 'src/app/models/skill.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HelperService } from 'src/app/services/helper.service';

export interface Selected {
  normal: string[];
  doubles: string[];
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  position: Position;
  positionform: FormGroup;
  title: string;
  race_id: number;
  selected: Selected;
  skills: Skill[];
  availableSkills: any[];
  skillsTaken: number[];
  skillList: PositionSkill[];

  resolve = false;

  constructor(
    private commonsService: CommonsService,
    private positionsService: PositionsService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public helperService: HelperService
  ) {
    this.positionform = this.fb.group(
      {
        name: ['', Validators.required],
        limit: ['', Validators.required],
        price: ['', Validators.required],
        ma: ['', Validators.required],
        st: ['', Validators.required],
        ag: ['', Validators.required],
        av: ['', Validators.required],
        skill: [''],
        normal: new FormArray([]),
        doubles: new FormArray([]),
      },
      { validator: this.validateTypes }
    );
    this.selected = { normal: [], doubles: [] };
  }

  private buildTypes(type: string) {
    const skillsSelected =
      this.position && this.position[type] !== '' ? this.position[type].split(',') : [];
    this.selected[type] = skillsSelected;
    SkillTypes.forEach(skill => {
      const control = new FormControl(
        skillsSelected.find(el => el === skill.link) ? true : false
      );
      (this.positionform.controls[type] as FormArray).push(control);
    });
  }

  private fillSkills() {
    this.skills.forEach(el => {
      if (!this.skillsTaken.includes(el.id)) {
        if (!this.availableSkills.find(gr => gr.name === el.type)) {
          this.availableSkills.push({ name: el.type, skills: [] });
        }

        const item = this.availableSkills.find(gr => gr.name === el.type);
        item.skills.push(el);
      }
    });
    this.positionform.controls.skill.setValue(null);
  }

  ngOnInit() {
    this.buildTypes('normal');
    this.buildTypes('doubles');
    const normal = <FormArray>this.positionform.get('normal');
    const doubles = <FormArray>this.positionform.get('doubles');
    // Deshabilitar campos contrarios a los que están seleccionados
    SkillTypes.forEach((skill, index) => {
      if (normal.controls[index].value === true) {
        doubles.controls[index].disable();
      }

      if (doubles.controls[index].value === true) {
        normal.controls[index].disable();
      }
    });

    if (this.position) {
      this.title = 'Editar';
      this.positionform.controls.name.setValue(this.position.name);
      this.positionform.controls.limit.setValue(this.position.limit);
      this.positionform.controls.price.setValue(this.position.price);
      this.positionform.controls.ma.setValue(this.position.ma);
      this.positionform.controls.st.setValue(this.position.st);
      this.positionform.controls.ag.setValue(this.position.ag);
      this.positionform.controls.av.setValue(this.position.av);
      this.skillsTaken = this.position.skills.map(el => el.skill_id);
      this.skillList = this.position.skills;
    } else {
      this.title = 'Nueva';
      this.skillsTaken = [];
      this.skillList = [];
    }
    this.availableSkills = [];
    this.fillSkills();
  }

  public close() {
    this.bsModalRef.hide();
  }

  public onSubmit() {
    if (this.positionform.valid) {
      this.commonsService.setLoading(true);
      const pos = {
        limit: this.positionform.controls.limit.value,
        name: this.positionform.controls.name.value,
        ma: this.positionform.controls.ma.value,
        st: this.positionform.controls.st.value,
        ag: this.positionform.controls.ag.value,
        av: this.positionform.controls.av.value,
        skills: this.skillList,
        normal: this.selected.normal.join(','),
        doubles: this.selected.doubles.join(','),
        price: this.positionform.controls.price.value,
        race_id: this.race_id,
      };
      if (this.position) {
        this.positionsService.update(this.position.id, pos).subscribe(
          _ => {
            this.commonsService.handleSuccess('Posición actualizada');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
            this.resolve = true;
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al actualizar la posición'
            );
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.positionsService.create(pos).subscribe(
          _ => {
            this.commonsService.handleSuccess('Posición creada');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
            this.resolve = true;
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al crear la posición'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
    } else {
      this.commonsService.markFormGroupTouched(this.positionform);
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
    return this.positionform.get('normal');
  }
  get doubles() {
    return this.positionform.get('doubles');
  }

  validateTypes(group: FormGroup): any {
    if (group) {
      // Validar que la suma de ambos arrays es 6 entre los 2 y que no se repiten
      const totalNormal = group.get('normal').value
        ? group
          .get('normal')
          .value // get a list of checkbox values (boolean)
          // .map(control => control.value)
          // total up the number of checked checkboxes
          .reduce((prev, next) => (next ? prev + next : prev), 0)
        : 0;
      const totalDoubles = group.get('doubles').value
        ? group
          .get('doubles')
          .value // get a list of checkbox values (boolean)
          // .map(control => control.value)
          // total up the number of checked checkboxes
          .reduce((prev, next) => (next ? prev + next : prev), 0)
        : 0;

      if (totalNormal + totalDoubles > 6 || totalNormal + totalDoubles < 4) {
        // Se deben seleccionar entre 4 y 6
        group.get('normal').setErrors({ required: true });
        group.get('doubles').setErrors({ required: true });
      } else {
        // Si se selecciona un número correcto no hay error
        group.get('normal').setErrors(null);
        group.get('doubles').setErrors(null);
      }
    }
  }

  toggleType(parent: string, index: number) {
    // Desactivar el control del tipo opuesto
    const opposite = parent === 'normal' ? 'doubles' : 'normal';
    const control = (<FormArray>this.positionform.get(opposite)).controls[index];
    control.disabled ? control.enable() : control.disable();
    control.disabled ? control.setValue(null) : control.setValue(false);

    // Añadir o quitar de los seleccionados del tipo seleccionado
    const finded = this.selected[parent].indexOf(SkillTypes[index].link);
    if (finded !== -1) {
      this.selected[parent].splice(finded, 1);
    } else {
      this.selected[parent].push(SkillTypes[index].link);
    }
  }

  skillType(index: number): string {
    return SkillTypes[index].short;
  }

  addSkill() {
    this.commonsService.setLoading(true);

    const skill = this.skills.find(
      el => el.id === Number(this.positionform.controls.skill.value)
    );
    if (this.position) {
      this.positionsService.newSkill(this.position.id, skill.id).subscribe(
        _ => {
          this.commonsService.handleSuccess('Habilidad añadida');
          this.commonsService.setLoading(false);
          this.addedSkill(skill.id, skill.name_es);
          this.resolve = true;
        },
        error => {
          this.commonsService.handleError(
            error, 'Se ha producido un error al añadir la habilidad'
          );
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.addedSkill(skill.id, skill.name_es);
    }
  }

  private addedSkill(skill_id: number, name: string) {
    this.skillList.push({
      skill_id: skill_id,
      position_id: this.position ? this.position.id : null,
      name: name,
    });
    /*this.availableSkills.forEach(el => {
      el.skills = el.skills.filter(sk => sk.id !== skill_id);
    });*/
    this.availableSkills = [];
    this.skillsTaken.push(skill_id);
    this.fillSkills();
    // this.positionform.controls.skill.setValue(null);
  }

  removeSkill(removeItem: PositionSkill) {
    const id = removeItem.skill_id;
    if (this.position) {
      this.positionsService.deleteSkill(this.position.id, id).subscribe(
        _ => {
          this.commonsService.handleSuccess('Habilidad eliminada');
          this.commonsService.setLoading(false);
          this.removedSkill(id);
          this.resolve = true;
        },
        error => {
          this.commonsService.handleError(
            error, 'Se ha producido un error al eliminar la habilidad'
          );
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.removedSkill(id);
    }
  }

  private removedSkill(id: number) {
    this.skillsTaken = this.skillsTaken.filter(el => el !== id);
    this.fillSkills();
    this.skillList = this.skillList.filter(el => el.skill_id !== id);
  }
}
