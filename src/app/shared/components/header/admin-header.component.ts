import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Observable } from 'rxjs';
import { selectTournaments } from '../../selectors/tournaments.selectors';
import { TournamentsActions } from '../../actions/tournaments.actions';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  header_title = 'Ría de Nurgle';
  tournaments$: Observable<Tournament[]> = this.store.pipe(select(selectTournaments));
  user = localStorage.getItem('googleName');
  image = localStorage.getItem('googleAvatar');

  constructor(
    private store: Store<AppState>,
    private tournamentService: TournamentsService,
    private router: Router
  ) {
    this.store.dispatch(TournamentsActions.getTournaments());
  }

  ngOnInit() {
  }

  toggle_menu(target: HTMLElement) {
    target.parentElement.classList.toggle('active');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
