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

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {
  race: Race;
  positions: Position[];
  star_players: StarPlayer[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private racesService: RacesService,
    private positionsService: PositionsService,
    private starplayersService: StarplayersService,
    private skillsService: SkillsService
  ) {
    this.loading = true;
    this.route.paramMap.subscribe(
      data => {
        this.racesService.getRace(data.get('race')).subscribe(
          response => {
            this.race = response;
            forkJoin(
              this.skillsService.getTypes(),
              this.positionsService.getPositions(response.id),
              this.starplayersService.getRaceStarPlayers(response.id)
            ).subscribe(
              response2 => {
                const types = response2[0];
                this.positions = response2[1];
                this.positions.forEach(po => {
                  let divided = po.normal.split(',');
                  po.normal = '';
                  divided.forEach(sk => {
                    const finded = types.find(el => el.link === sk);
                    if (finded) {
                      po.normal += (po.normal === '' ? '' : ', ') + finded.name;
                    }
                  });

                  divided = po.doubles.split(',');
                  po.doubles = '';
                  divided.forEach(sk => {
                    const finded = types.find(el => el.link === sk);
                    if (finded) {
                      po.doubles += (po.doubles === '' ? '' : ', ') + finded.name;
                    }
                  });
                });
                this.star_players = response2[2];
                this.loading = false;
              },
              error => {
                console.error(error);
                this.loading = false;
              }
            );
          },
          error => {
            console.error(error);
            this.loading = false;
          }
        );
      }
    );
  }

  ngOnInit() {
  }

}
