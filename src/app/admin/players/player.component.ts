import { Component, OnInit } from '@angular/core';
import { Player, PostPlayer } from 'src/app/models/player.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Position } from 'src/app/models/position.model';
import { CommonsService } from 'src/app/services/commons.service';
import { Team } from 'src/app/models/team.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: Player;
  team: Team;
  positions: Position[];

  free_numbers: number[];
  occupied_numbers: number[];
  free_positions: any[];
  occupied_positions: any[];
  title: string;
  playerform: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private playersService: PlayersService,
    private commonsService: CommonsService,
    private fb: FormBuilder
  ) {
    this.free_numbers = [];
    this.occupied_numbers =  [];
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
      status: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
    if (this.player === null) {
      this.title = 'Nuevo';

      this.team.players.forEach(pl => {
        if (pl.number < 17) {
          this.occupied_numbers.push(pl.number);
        }

        const item = this.occupied_positions.find(el => el.id === pl.position_id);
        if (!item) {
          this.occupied_positions.push({id: pl.position_id, value: 1});
        } else {
          item.value++;
        }
      });

      console.log(this.occupied_positions);

      for (let i = 1; i < 17; ++i) {
        if (!this.occupied_numbers.includes(i)) {
          this.free_numbers.push(i);
        }
      }

      this.positions.forEach(po => {
        const finded = this.occupied_positions.find(el => el.id === po.id);
        console.log('finded', finded);
        if ((!finded || finded.value < po.limit) && po.price < this.team.treasury) {
          this.free_positions.push({id: po.id, name: po.name});
        }
      });
      console.log(this.free_positions);
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
      this.playerform.controls.status.setValue(this.player.status);
    }
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
        status: this.playerform.controls.price.value,
        team_id: this.team.id,
        injuries: this.player.injuries,
        value: this.player.value,
        position_id: this.playerform.controls.position_id.value
      };
      if (this.player) {
        this.playersService.update(this.player.id, pla).subscribe(
          response => {
            this.commonsService.handleSuccess('Jugador actualizado');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al actualizar el jugador'
              : error.message);
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.playersService.create(pla).subscribe(
          response => {
            this.commonsService.handleSuccess('Jugador añadido');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al añadir el jugador'
              : error.message);
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
}
