import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit, OnDestroy {
  tournament: Tournament;
  toursubscript$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.commonsService.setTitle(data.tournament.name + ' Ria de Nurgle');
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los datos del torneo'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toursubscript$.unsubscribe();
  }
}
