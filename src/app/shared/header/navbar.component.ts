import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { NavigationLink } from 'src/app/models/link.model';
import { Subscription, forkJoin } from 'rxjs';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  tournaments: Tournament[];
  links: NavigationLink[];
  subscriptions: Subscription = new Subscription();

  constructor(
    private tournamentService: TournamentsService,
    private linksService: LinksService,
  ) { }

  ngOnInit(): void {
    // Datos para la navegación
    this.subscriptions.add(
      forkJoin([
        this.tournamentService.getTournaments(),
        this.linksService.get()
      ])
      .subscribe(
        response => {
          this.tournaments = response[0];
          this.links = response[1];
        },
        error => { }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
