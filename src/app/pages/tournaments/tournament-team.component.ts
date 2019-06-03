import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';
import { Subscription } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-tournament-team',
  templateUrl: './tournament-team.component.html',
  styleUrls: ['./tournament-team.component.scss']
})
export class TournamentTeamComponent implements OnInit {
  team: Team;
  tournament: Tournament;
  toursubscript$: Subscription;

  constructor(
    private teamsService: TeamsService,
    private commonsService: CommonsService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Equipos que participan en el torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.teamsService.getTeam(this.route.snapshot.params['team']).subscribe(
          data2 => {
            this.team = data2;
            this.team.players_count = 0;
            this.team.players_value = 0;
            this.team.players.forEach(pl => {
              if (pl.injuries === '') {
                this.team.players_count++;
                this.team.players_value += pl.value;
              }
            });
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar los equipos del torneo'
              : error.message);
            this.commonsService.setLoading(false);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  public viewTab(link: any, tab: string) {
    const a = link as HTMLElement;
    document.querySelector('.tab-pane.active').classList.remove('active');
    document.querySelector('.tab-item.active').classList.remove('active');
    document.getElementById(tab).classList.add('active');
    a.parentElement.classList.add('active');
  }
}
