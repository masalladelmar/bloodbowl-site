import { Component, OnInit, OnDestroy } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/models/tournament.model';
import { NavigationLink } from 'src/app/models/link.model';
import { LinksService } from 'src/app/services/links.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
  tournaments: Tournament[];
  tournamentSelected: Tournament;
  links: NavigationLink[];
  title: string;
  tourselected$: Subscription;
  title$: Subscription;

  constructor(
    private tournamentService: TournamentsService,
    private linksService: LinksService,
    private commonsService: CommonsService
  ) {
    // Suscripciones del servicio común
    this.tourselected$ = this.commonsService.getTournament().subscribe(
      data => this.tournamentSelected = data
    );
    this.title$ = this.commonsService.getTitle().subscribe(
      data => this.title = data
    );
  }

  ngOnInit() {
    // Datos para la navegación
    this.tournamentService.getTournaments().subscribe(
      response => this.tournaments = response,
      error => {}
    );

    this.linksService.getLinks().subscribe(
      response => this.links = response,
      error => {}
    );
  }

  ngOnDestroy() {
    this.tourselected$.unsubscribe();
    this.title$.unsubscribe();
  }

  clearTournament() {
    this.tournamentSelected = null;
  }

  show_menu() {
    document.getElementById('sidebar-id').classList.add('active');
  }

  hide_menu() {
    document.getElementById('sidebar-id').classList.remove('active');
  }
}
