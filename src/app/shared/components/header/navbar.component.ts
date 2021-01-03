import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { NavigationLink } from 'src/app/models/link.model';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectTournaments } from '../../selectors/tournaments.selectors';
import { TournamentsActions } from '../../actions/tournaments.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  tournaments$: Observable<Tournament[]> = this.store.pipe(select(selectTournaments));
  links: NavigationLink[];
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private linksService: LinksService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(TournamentsActions.getTournaments());
    // Datos para la navegación
    this.subscriptions.add(
      forkJoin([
        this.linksService.get()
      ])
      .subscribe(
        response => {
          this.links = response[0];
        },
        error => { }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
