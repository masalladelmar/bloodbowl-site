import { Component, OnInit, OnDestroy } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { CommonsService } from 'src/app/services/commons.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-tournament-experience',
  templateUrl: './tournament-experience.component.html',
  styleUrls: ['./tournament-experience.component.scss']
})
export class TournamentExperienceComponent implements OnInit, OnDestroy {
  toursubscript$: Subscription;
  tournament: Tournament;
  experience: any;

  constructor(
    private commonsService: CommonsService,
    private tournamentsService: TournamentsService,
    private route: ActivatedRoute,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Experiencia en el torneo');
    this.toursubscript$ = this.route.data.subscribe(
      data => {
        this.tournament = data.tournament;
        this.commonsService.setTournament(data.tournament);
        this.tournamentsService.getExperience(this.tournament.id).subscribe(
          response => {
            this.experience = response;
            this.commonsService.setLoading(false);
          },
          error => {
            this.commonsService.handleError(error, 'Se ha producido un error al recuperar la experiencia del torneo');
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
