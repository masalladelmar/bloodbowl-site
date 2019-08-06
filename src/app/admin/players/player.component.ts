import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Position } from 'src/app/models/position.model';
import { PositionsService } from 'src/app/services/positions.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Team } from 'src/app/models/team.model';

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

  constructor(
    public bsModalRef: BsModalRef,
    private positionsService: PositionsService,
    private commonsService: CommonsService
  ) {
    this.free_numbers = [];
    this.occupied_numbers =  [];
    this.free_positions = [];
    this.occupied_positions = [];
  }

  ngOnInit() {
    if (this.player === null) {
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
    }
  }

  save() {
    this.bsModalRef.hide();
  }
}
