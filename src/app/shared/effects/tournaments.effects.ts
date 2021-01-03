import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { TournamentsActions } from '../actions/tournaments.actions';

@Injectable()
export class TournamentsEffects {

  @Effect()
  loadTournaments$ = this.actions$.pipe(
    ofType(TournamentsActions.getTournaments),
    switchMap(() => this.tournamentsService.getTournaments().pipe(
      map(tournaments => TournamentsActions.getTournamentsSuccess({ payload: tournaments })),
      catchError(() => EMPTY)
    ))
  );

  constructor(private actions$: Actions, private tournamentsService: TournamentsService) {}
}
