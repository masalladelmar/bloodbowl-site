import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { Tournament } from 'src/app/models/tournament.model';
import { Subscription } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-tournament-team',
  templateUrl: './tournament-team.component.html',
  styleUrls: ['./tournament-team.component.scss']
})
export class TournamentTeamComponent implements OnInit, OnDestroy {
  team: Team;
  tournament: Tournament;
  matches: Match[];
  toursubscript$: Subscription;
  cas_for: number;
  cas_against: number;
  winnings: number;
  points: number;
  casualties: number;
  td: number;
  desventaja: number;

  constructor(
    private teamsService: TeamsService,
    private commonsService: CommonsService,
    private route: ActivatedRoute,
    public helper: HelperService,
    private matchesService: MatchesService
  ) {
    this.cas_for = 0;
    this.cas_against = 0;
    this.winnings = 0;
    this.points = 0;
    this.casualties = 0;
    this.td = 0;
    this.desventaja = 0;
    this.commonsService.setLoading(true);
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.teamsService.getTeam(this.route.snapshot.params['team']).subscribe(
          data2 => {
            this.team = data2;
            this.commonsService.setTitle(this.team.name + ' en ' + this.tournament.name + ' Ria de Nurgle');
            this.team.players_count = 0;
            this.team.players_value = 0;
            this.team.players.forEach(pl => {
              if (pl.injuries === '') {
                this.team.players_count++;
                this.team.players_value += pl.value;
              }
            });
            this.matchesService.getMatches(data.tournament.id, data2.id).subscribe(
              data3 => {
                this.matches = data3;
                this.matches.forEach(el => {
                  if (el.team_id_1 === this.team.id) {
                    this.cas_for += el.cas_1;
                    this.cas_against += el.cas_2;
                    this.winnings += el.winnings_1;
                    this.points += el.points_1;
                    this.td += el.td_1;
                  } else {
                    this.cas_for += el.cas_2;
                    this.cas_against += el.cas_1;
                    this.winnings += el.winnings_2;
                    this.points += el.points_2;
                    this.td += el.td_2;
                  }

                  this.casualties += el.cas;
                });
                this.commonsService.setLoading(false);
              },
              error => {
                this.commonsService.handleError(error.status === 500
                  ? 'Se ha producido un error al recuperar los encuentros del equipo en el torneo'
                  : error.message);
                this.commonsService.setLoading(false);
              }
            );
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

  ngOnDestroy() {
    this.toursubscript$.unsubscribe();
  }
}
