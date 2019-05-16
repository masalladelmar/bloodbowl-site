import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  tournaments: Tournament[];
  tournamentSelected: Tournament;

  constructor(
    private tournamentService: TournamentsService
  ) {
  }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe(
      response => {this.tournaments = response; },
      error => {}
    );
  }

}
