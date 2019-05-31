import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/models/tournament.model';
import { ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  tournament: Tournament;

  constructor(
    private tournamentsService: TournamentsService,
    private route: ActivatedRoute,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.route.paramMap.subscribe(
      data => {
        this.tournamentsService.getTournament(data.get('tournament')).subscribe(
          response => {
            this.tournament = response;
            this.commonsService.setTournament(response);
            this.commonsService.setTitle(response.name + ' Ria de Nurgle');
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
    );
  }

  ngOnInit() {
  }

}
