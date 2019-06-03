import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { CoachesService } from 'src/app/services/coaches.service';
import { TeamsService } from 'src/app/services/teams.service';
import { ActivatedRoute } from '@angular/router';
import { Coach } from 'src/app/models/coach.model';
import { CommonsService } from 'src/app/services/commons.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  coach: Coach;
  teams: Team[];

  constructor(
    private coachesService: CoachesService,
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.coachesService.getCoach(this.route.snapshot.paramMap.get('coach')).subscribe(
      response => {
        this.coach = response;
        this.commonsService.setTitle('Entrenador/a: ' + response.name);
        this.teamsService.getTeamsByCoach(response.id).subscribe(
          response2 => {
            this.teams = response2;
            this.teams.forEach(te => {
              te.players_count = 0;
              te.players_value = 0;
              te.players.forEach(pl => {
                if (pl.injuries === '') {
                  te.players_count++;
                  te.players_value += pl.value;
                }
              });
            });
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar los equipos del entrenador'
              : error.message);
            this.commonsService.setLoading(false);
          }
        );
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los datos del entrenador'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }
}
