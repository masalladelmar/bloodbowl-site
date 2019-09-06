import { Component, OnInit } from '@angular/core';
import { Player, PostPlayer } from 'src/app/models/player.model';
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

  _addSkill = false;
  _addCharact = false;

  resolve = false;

  skillstypes: any[];

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
      ma: ['', Validators.required],
      st: ['', Validators.required],
      ag: ['', Validators.required],
      av: ['', Validators.required],
      skills: [''],
      characteristics: [''],
      status: ['', Validators.required],
      skill: [''],
      attribute: [''],
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
      this.playerform.controls.name.setValue(this.player.name);
      this.playerform.controls.position_id.setValue(this.player.position_id);
      this.playerform.controls.number.setValue(this.player.number);
      this.playerform.controls.ma.setValue(this.player.ma);
      this.playerform.controls.st.setValue(this.player.st);
      this.playerform.controls.ag.setValue(this.player.ag);
      this.playerform.controls.av.setValue(this.player.av);
      this.playerform.controls.skills.setValue(this.player.skills);
      this.playerform.controls.characteristics.setValue(this.player.characteristics);
      this.playerform.controls.status.setValue(this.player.status);
    }

    this.skillstypes = [];
    this.skills.forEach(el => {
      if (!this.skillstypes.find(gr => gr.name === el.type)) {
        this.skillstypes.push({ name: el.type, skills: [] });
      }

      const item = this.skillstypes.find(gr => gr.name === el.type);
      item.skills.push(el);
    });
  }

  public onSubmit() {
    if (this.playerform.valid) {
      this.commonsService.setLoading(true);
      const pla: PostPlayer = {
        number: this.playerform.controls.limit.value,
        name: this.playerform.controls.name.value,
        ma: this.playerform.controls.ma.value,
        st: this.playerform.controls.st.value,
        ag: this.playerform.controls.ag.value,
        av: this.playerform.controls.av.value,
        skills: this.playerform.controls.skills.value,
        characteristics: this.playerform.controls.characteristics.value,
        status: this.playerform.controls.price.value,
        team_id: this.team.id,
        injuries: this.player.injuries,
        value: this.player.value,
        position_id: this.playerform.controls.position_id.value,
      };
      if (this.player) {
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

  viewAddSkill() {
    this._addSkill = !this._addSkill;
  }

  get addSkill() {
    return this._addSkill;
  }

  viewAddCharact() {
    this._addCharact = !this._addCharact;
  }

  get addCharact() {
    return this._addCharact;
  }
}
