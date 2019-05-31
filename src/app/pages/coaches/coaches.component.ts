import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { Coach } from 'src/app/models/coach.model';
import { CommonsService } from 'src/app/services/commons.service';
import { forkJoin } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coaches: Coach[];

  constructor(
    private coachesService: CoachesService,
    private commonsService: CommonsService,
    private teamsService: TeamsService
  ) {

  }

  ngOnInit() {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Listado de entrenadores');
    forkJoin(
      this.coachesService.getCoaches(),
      this.teamsService.getTeams()
    )
    .subscribe(
      data => {
        this.coaches = data[0];
        data[1].forEach(te => {
          const coach = this.coaches.find(co => co.id === te.coach_id);
          if (coach) {
            if (!coach.teams) {
              coach.teams = [];
            }
            coach.teams.push(te);
          }
        });

        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los entrenadores'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

}
