import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-teams',
  templateUrl: './tournament-teams.component.html',
  styleUrls: ['./tournament-teams.component.scss']
})
export class TournamentTeamsComponent implements OnInit, OnDestroy {
  teams: Team[];
  tournament: Tournament;
  toursubscript$: Subscription;

  constructor(
    private teamsService: TeamsService,
    private commonsService: CommonsService,
    private route: ActivatedRoute
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Equipos que participan en el torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.teamsService.getTeamsByTournament(this.tournament.id).subscribe(
          data2 => {
            this.teams = data2;
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al recuperar los equipos del torneo');
            this.commonsService.setLoading(false);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toursubscript$.unsubscribe();
  }
}
