import { Component, OnInit, OnDestroy } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/models/tournament.model';
import { NavigationLink } from 'src/app/models/link.model';
import { LinksService } from 'src/app/services/links.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

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
  route$: Subscription;
  isTournaments: boolean;

  constructor(
    private tournamentService: TournamentsService,
    private linksService: LinksService,
    private commonsService: CommonsService,
    private router: Router
  ) {
    this.isTournaments = false;
    // Suscripciones del servicio común
    this.tourselected$ = this.commonsService.getTournament().subscribe(
      data => this.tournamentSelected = data
    );
    this.title$ = this.commonsService.getTitle().subscribe(
      data => this.title = data
    );
    this.route$ = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url.startsWith('/tournaments')) {
          this.isTournaments = true;
        } else {
          this.isTournaments = false;
        }
      }
    });
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
    this.route$.unsubscribe();
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
