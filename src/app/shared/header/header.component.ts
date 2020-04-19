import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { NavigationLink } from 'src/app/models/link.model';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { LinksService } from 'src/app/services/links.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  header_title: string;
  tournaments: Tournament[];
  links: NavigationLink[];
  subscriptions: Subscription = new Subscription();

  constructor(
    private tournamentService: TournamentsService,
    private linksService: LinksService,
    private commonsService: CommonsService
  ) {
    this.header_title = 'Comunidad Ria de Nurgle';
  }

  ngOnInit() {
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
