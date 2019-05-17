import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/models/tournament.model';
import { NavigationLink } from 'src/app/models/link.model';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  tournaments: Tournament[];
  tournamentSelected: Tournament;
  links: NavigationLink[];

  constructor(
    private tournamentService: TournamentsService,
    private linksService: LinksService
  ) {
  }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe(
      response => {this.tournaments = response; },
      error => {}
    );

    this.linksService.getLinks().subscribe(
      response => this.links = response.filter(el => el.published),
      error => {}
    );
  }
}
