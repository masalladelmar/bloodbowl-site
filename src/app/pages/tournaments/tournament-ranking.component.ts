import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { CommonsService } from 'src/app/services/commons.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

interface Group {
  name: string;
  teams: any[];
}

@Component({
  selector: 'app-tournament-ranking',
  templateUrl: './tournament-ranking.component.html',
  styleUrls: ['./tournament-ranking.component.scss']
})
export class TournamentRankingComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  ranking: any;
  groups: Group[];

  constructor(
    private commonsService: CommonsService,
    private tournamentsService: TournamentsService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Clasificación del torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.tournamentsService.getRanking(this.tournament.id).subscribe(
          data2 => {
            this.ranking = data2;
            if (this.tournament.groups) {
              this.groups = [];
              this.ranking.forEach(el => {
                if (!this.groups.find(gr => gr.name === el.tournament_group)) {
                  this.groups.push({name: el.tournament_group, teams: []});
                }

                const item = this.groups.find(gr => gr.name === el.tournament_group);
                item.teams.push(el);
              });
            }
            this.commonsService.setLoading(false);
          },
          error => {
            console.log(error);
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar la clasificación del torneo'
              : error.message);
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
