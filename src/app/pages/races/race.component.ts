import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RacesService } from 'src/app/services/races.service';
import { Race } from 'src/app/models/race.model';
import { PositionsService } from 'src/app/services/positions.service';
import { StarPlayer } from 'src/app/models/starplayer.model';
import { Position } from 'src/app/models/position.model';
import { StarplayersService } from 'src/app/services/starplayers.service';
import { forkJoin } from 'rxjs';
import { SkillsService } from 'src/app/services/skills.service';
import { CommonsService } from 'src/app/services/commons.service';
import { SkillType } from 'src/app/models/skill.model';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {
  race: Race;
  positions: Position[];
  star_players: StarPlayer[];
  types: SkillType[];

  constructor(
    private route: ActivatedRoute,
    private racesService: RacesService,
    private positionsService: PositionsService,
    private starplayersService: StarplayersService,
    private skillsService: SkillsService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.route.paramMap.subscribe(
      data => {
        this.racesService.getRace(data.get('race')).subscribe(
          response => {
            this.race = response;
            this.commonsService.setTitle('Jugadores de los equipos de ' + this.race.name);
            forkJoin(
              this.skillsService.getTypes(),
              this.positionsService.getPositions(response.id),
              this.starplayersService.getRaceStarPlayers(response.id)
            ).subscribe(
              response2 => {
                this.types = response2[0];
                this.positions = response2[1];
                this.star_players = response2[2];
                this.commonsService.setLoading(false);
              },
              error => {
                this.commonsService.handleError(error.status === 500
                  ? 'Se ha producido un error al recuperar las posiciones y estrellas de la raza'
                  : error.message);
                this.commonsService.setLoading(false);
              }
            );
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar los datos de la raza'
              : error.message);
            this.commonsService.setLoading(false);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  getTypesSelected(types: string): string {
    let out = '';
    const divided = types.split(',');
    divided.forEach(sk => {
      const finded = this.types.find(el => el.link === sk);
      if (finded) {
        out += (out === '' ? '' : ', ') + finded.short;
      }
    });

    return out;
  }
}
