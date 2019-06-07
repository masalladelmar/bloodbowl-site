import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { HelperService } from 'src/app/services/helper.service';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-hall-dead',
  templateUrl: './hall-dead.component.html',
  styleUrls: ['./hall-dead.component.scss']
})
export class HallDeadComponent implements OnInit {
  players: Player[];

  constructor(
    private commonsService: CommonsService,
    private playersService: PlayersService,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Hall Of Dead');
    this.playersService.getDead().subscribe(
      response => {
        this.players = response;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los jugadores fallecidos'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }

}
