import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { Match } from 'src/app/models/match.model';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { MatchesService } from 'src/app/services/matches.service';
import { JourneysService } from 'src/app/services/journeys.service';
import { Journey } from 'src/app/models/journey.model';

@Component({
  selector: 'app-tournament-matches',
  templateUrl: './tournament-matches.component.html',
  styleUrls: ['./tournament-matches.component.scss']
})
export class TournamentMatchesComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  matches: Match[];
  journeys: Journey[];

  constructor(
    private commonsService: CommonsService,
    private matchesService: MatchesService,
    private journeysService: JourneysService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.journeys = [];
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Emparejamientos del torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        forkJoin(
          this.matchesService.getMatchesTournament(this.tournament.id),
          this.journeysService.getJourneys(this.tournament.id)
        ).subscribe(
          response => {
            this.matches = response[0];
            this.journeys = response[1];
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al recuperar los emparejamientos del torneo');
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

  public matches_filtered(journey: number): Match[] {
    return this.matches.filter(el => el.journey === journey);
  }
}
