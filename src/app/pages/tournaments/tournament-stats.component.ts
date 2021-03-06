import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-tournament-stats',
  templateUrl: './tournament-stats.component.html',
  styleUrls: ['./tournament-stats.component.scss']
})
export class TournamentStatsComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  stats: any;

  constructor(
    private commonsService: CommonsService,
    private tournamentsService: TournamentsService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Estadísticas del torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.tournamentsService.getStats(this.tournament.id).subscribe(
          data2 => {
            this.stats = data2;
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al recuperar las estadísticas del torneo');
            this.commonsService.setLoading(false);
          }
        );
      }
    );
  }

  public viewTab(event: Event, tab: string) {
    event.preventDefault();
    const a = event.target as HTMLElement;
    document.querySelector('.tab-pane.active').classList.remove('active');
    document.querySelector('.nav-tabs .nav-link.active').classList.remove('active');
    document.getElementById(tab).classList.add('active');
    a.classList.add('active');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toursubscript$.unsubscribe();
  }
}
