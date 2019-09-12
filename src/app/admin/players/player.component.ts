import { Component, OnInit } from '@angular/core';
import { Player, PostPlayer, Modifier, PlayerSkill } from 'src/app/models/player.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Position } from 'src/app/models/position.model';
import { CommonsService } from 'src/app/services/commons.service';
import { Team } from 'src/app/models/team.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';
import { Skill } from 'src/app/models/skill.model';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  player: Player;
  team: Team;
  positions: Position[];
  skills: Skill[];

  free_numbers: number[];
  occupied_numbers: number[];
  free_positions: any[];
  occupied_positions: any[];
  title: string;
  playerform: FormGroup;

  playerPosition: Position;
  skillsTaken: number[];
  availableSkills: any[];

  _viewAddSkill = false;
  _viewAddModifier = false;

  resolve = false;
  showConfirm = false;
  confirmMessage: string = null;
  removeItem: Modifier | PlayerSkill;

  constructor(
    public bsModalRef: BsModalRef,
    private playersService: PlayersService,
    private commonsService: CommonsService,
    private fb: FormBuilder,
    public helperService: HelperService
  ) {
    this.free_numbers = [];
    this.occupied_numbers = [];
    this.free_positions = [];
    this.occupied_positions = [];

    this.playerform = this.fb.group({
      name: [''],
      position_id: ['', Validators.required],
      number: ['', Validators.required],
      status: ['', Validators.required],
      skill: [''],
      attribute: [''],
      modifier_type: [''],
    });
  }

  ngOnInit() {
    if (this.player === null) {
      this.title = 'Nuevo';

      this.team.players
        .filter(el => el.status === 'active')
        .forEach(pl => {
          if (pl.number < 17) {
            this.occupied_numbers.push(pl.number);
          }

          const item = this.occupied_positions.find(el => el.id === pl.position_id);
          if (!item) {
            this.occupied_positions.push({ id: pl.position_id, value: 1 });
          } else {
            item.value++;
          }
        });

      for (let i = 1; i < 17; ++i) {
        if (!this.occupied_numbers.includes(i)) {
          this.free_numbers.push(i);
        }
      }

      this.positions.forEach(po => {
        const finded = this.occupied_positions.find(el => el.id === po.id);
        if ((!finded || finded.value < po.limit) && po.price < this.team.treasury) {
          this.free_positions.push({ id: po.id, name: po.name });
        }
      });
    } else {
      this.title = 'Editar';
      console.log(this.player);
      this.skillsTaken = this.player.skills.map(el => el.skill_id);
      this.playerform.controls.name.setValue(this.player.name);
      this.playerform.controls.position_id.setValue(this.player.position_id);
      this.playerform.controls.number.setValue(this.player.number);
      this.playerform.controls.status.setValue(this.player.status);

      this.playerPosition = this.positions.find(el => el.id === this.player.position_id);

      this.availableSkills = [];
      this.fillSkills();
    }
  }

  public onSubmit() {
    if (this.playerform.valid) {
      this.commonsService.setLoading(true);
      const pla: PostPlayer = {
        number: this.playerform.controls.number.value,
        name: this.playerform.controls.name.value,
        ma: this.player.ma,
        st: this.player.st,
        ag: this.player.ag,
        av: this.player.av,
        status: this.playerform.controls.status.value,
        value: this.player.value,
      };
      if (this.player) {
        this.commonsService.setLoading(true);
        this.playersService.update(this.player.id, pla).subscribe(
          response => {
            this.commonsService.handleSuccess('Jugador actualizado');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
            this.resolve = true;
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al actualizar el jugador'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.commonsService.setLoading(true);
        this.playersService.create(pla).subscribe(
          response => {
            this.commonsService.handleSuccess('Jugador añadido');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
            this.resolve = true;
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al añadir el jugador'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      }
    } else {
      this.commonsService.markFormGroupTouched(this.playerform);
      this.commonsService.handleError('Hay campos sin rellenar');
    }
  }

  private fillSkills() {
    this.skills.forEach(el => {
      if (
        (this.playerPosition.normal.includes(el.type) ||
          this.playerPosition.doubles.includes(el.type)) &&
        !this.skillsTaken.includes(el.id)
      ) {
        if (!this.availableSkills.find(gr => gr.name === el.type)) {
          this.availableSkills.push({ name: el.type, skills: [] });
        }

        const item = this.availableSkills.find(gr => gr.name === el.type);
        item.skills.push(el);
      }
    });
  }

  get position_id() {
    return this.playerform.get('position_id');
  }
  get number() {
    return this.playerform.get('number');
  }
  get ma() {
    return this.playerform.get('ma');
  }
  get st() {
    return this.playerform.get('st');
  }
  get ag() {
    return this.playerform.get('ag');
  }
  get av() {
    return this.playerform.get('av');
  }
  get status() {
    return this.playerform.get('status');
  }

  toggleViewAddSkill() {
    this._viewAddSkill = !this._viewAddSkill;
  }

  get viewAddSkill() {
    return this._viewAddSkill;
  }

  addSkill() {
    this.commonsService.setLoading(true);

    const skill = this.skills.find(
      el => el.id === Number(this.playerform.controls.skill.value)
    );
    const position = this.positions.find(el => el.id === this.player.position_id);
    const money_modifier = position.normal.includes(skill.type) ? 20 : 30;
    this.playersService.newSkill(this.player.id, skill.id, money_modifier).subscribe(
      response => {
        this.commonsService.handleSuccess('Habilidad añadida');
        this.commonsService.setLoading(false);
        this.player.skills.push({
          skill_id: skill.id,
          modifier: money_modifier,
          name: skill.name_es,
        });
        this.player.value += money_modifier * 1000;
        this.availableSkills.forEach(el => {
          el.skills = el.skills.filter(sk => sk.id !== skill.id);
        });
        this.playerform.controls.skill.setValue(null);
        this.toggleViewAddSkill();
      },
      error => {
        this.commonsService.handleError(
          error.status === 500
            ? 'Se ha producido un error al añadir la habilidad'
            : error.message
        );
        this.commonsService.setLoading(false);
      }
    );
  }

  toggleViewAddModifier() {
    this._viewAddModifier = !this._viewAddModifier;
  }

  get viewAddModifier() {
    return this._viewAddModifier;
  }

  addModifier() {
    this.commonsService.setLoading(true);
    this.playersService
      .newModifier(
        this.player.id,
        this.playerform.controls.attribute.value,
        this.playerform.controls.modifier_type.value
      )
      .subscribe(
        response => {
          this.commonsService.handleSuccess('Modificador añadido');
          this.commonsService.setLoading(false);
          this.player.modifiers.push({
            type: this.playerform.controls.attribute.value,
            modifier: this.playerform.controls.modifier_type.value,
            id: response,
          });
          if (Number(this.playerform.controls.modifier_type.value) > 0) {
            // Sumar modificador al valor si es a sumar (subida de nivel)
            switch (this.playerform.controls.attribute.value) {
              case 'st':
                this.player.value += 50000;
                break;
              case 'ag':
                this.player.value += 40000;
                break;
              case 'ma':
              case 'av':
                this.player.value += 30000;
                break;
            }
          }

          this.player[this.playerform.controls.attribute.value] += Number(
            this.playerform.controls.modifier_type.value
          );
          this.toggleViewAddModifier();
          this.playerform.controls.attribute.setValue(null);
          this.playerform.controls.modifier_type.setValue(null);
        },
        error => {
          this.commonsService.handleError(
            error.status === 500
              ? 'Se ha producido un error al añadir el modificador'
              : error.message
          );
          this.commonsService.setLoading(false);
        }
      );
  }

  confirmRemove(item: Modifier | PlayerSkill) {
    this.showConfirm = true;
    this.confirmMessage =
      (item as Modifier).type !== undefined
        ? 'el modificador ' +
          (item as Modifier).modifier +
          ' ' +
          this.helperService.getAttributeName((item as Modifier).type)
        : 'la habilidad ' + (item as PlayerSkill).name;
    this.removeItem = item;
  }
  cancelRemove() {
    this.showConfirm = false;
    this.confirmMessage = null;
    this.removeItem = null;
  }
  remove() {
    if ((this.removeItem as Modifier).type !== undefined) {
      const id = (this.removeItem as Modifier).id;
      this.commonsService.setLoading(true);
      this.playersService.deleteModifier(this.player.id, id).subscribe(
        response => {
          this.commonsService.handleSuccess('Modificador eliminado');
          this.commonsService.setLoading(false);
          this.player.modifiers = this.player.modifiers.filter(el => el.id !== id);
          // TODO: Restar valor del jugador y eliminar el modificador del atributo afectado
        },
        error => {
          this.commonsService.handleError(
            error.status === 500
              ? 'Se ha producido un error al eliminar el modificador'
              : error.message
          );
          this.commonsService.setLoading(false);
        }
      );
    } else {
      const id = (this.removeItem as PlayerSkill).skill_id;
      this.playersService.deleteSkill(this.player.id, id).subscribe(
        response => {
          this.commonsService.handleSuccess('Habilidad eliminada');
          this.commonsService.setLoading(false);
          this.skillsTaken = this.skillsTaken.filter(el => el !== id);
          this.fillSkills();
          this.player.skills = this.player.skills.filter(el => el.skill_id !== id);
          // TODO: Restar valor del jugador
        },
        error => {
          this.commonsService.handleError(
            error.status === 500
              ? 'Se ha producido un error al eliminar la habilidad'
              : error.message
          );
          this.commonsService.setLoading(false);
        }
      );
    }

    this.cancelRemove();
  }
}
