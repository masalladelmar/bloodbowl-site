import { Component, OnInit, OnDestroy } from '@angular/core';
import { Journey } from 'src/app/models/journey.model';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { JourneysService } from 'src/app/services/journeys.service';

@Component({
  selector: 'app-tournament-journeys',
  templateUrl: './tournament-journeys.component.html',
  styleUrls: ['./tournament-journeys.component.scss']
})
export class TournamentJourneysComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  journeys: Journey[];

  constructor(
    private commonsService: CommonsService,
    private journeysService: JourneysService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Jornadas del torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.journeysService.getJourneys(this.tournament.id).subscribe(
          response => {
            this.journeys = response;
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
