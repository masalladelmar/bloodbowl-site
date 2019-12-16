import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { JourneysService } from 'src/app/services/journeys.service';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-tournament-journey',
  templateUrl: './tournament-journey.component.html',
  styleUrls: ['./tournament-journey.component.scss']
})
export class TournamentJourneyComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  matches: Match[];

  constructor(
    private commonsService: CommonsService,
    private journeysService: JourneysService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.journeysService.getJourney(this.tournament.id, this.route.snapshot.params['journey']).subscribe(
          response => {
            this.matches = response;
            this.commonsService.setTitle('Encuentros de la jornada ' + this.route.snapshot.params['journey']);
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al recuperar las jornadas del torneo');
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
