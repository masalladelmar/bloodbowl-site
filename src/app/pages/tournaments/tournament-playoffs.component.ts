import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Match } from 'src/app/models/match.model';
import { PlayoffsService } from 'src/app/services/playoffs.service';

@Component({
  selector: 'app-tournament-playoffs',
  templateUrl: './tournament-playoffs.component.html',
  styleUrls: ['./tournament-playoffs.component.scss']
})
export class TournamentPlayoffsComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  matches: Match[];
  phase: number;
  semi1: Match;
  semi2: Match;
  final: Match;
  third: Match;
  quarter1: Match;
  quarter2: Match;
  quarter3: Match;
  quarter4: Match;

  constructor(
    private commonsService: CommonsService,
    private playoffsService: PlayoffsService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('PlayOffs del torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.playoffsService.getMatches(this.tournament.id).subscribe(
          response => {
            this.matches = response;
            this.phase = Math.max(...this.matches.map(el => el.phase));
            switch (this.phase) {
              case 2:
                this.semi1 = this.matches[0];
                this.semi2 = this.matches[1];
                if (this.matches[2]) {
                  this.final = this.matches[2];
                }
                if (this.matches[3]) {
                  this.third = this.matches[3];
                }
                break;
              case 4:
                this.quarter1 = this.matches[0];
                this.quarter2 = this.matches[1];
                this.quarter3 = this.matches[2];
                this.quarter4 = this.matches[3];
                if (this.matches[4]) {
                  this.semi1 = this.matches[4];
                }
                if (this.matches[5]) {
                  this.semi2 = this.matches[5];
                }
                if (this.matches[6]) {
                  this.final = this.matches[6];
                }
                if (this.matches[7]) {
                  this.third = this.matches[7];
                }
                break;
              case 8:
                break;
            }
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar los datos de los playoffs'
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
