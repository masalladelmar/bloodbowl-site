import { createAction, props } from '@ngrx/store';
import { Tournament } from 'src/app/models/tournament.model';

const getTournaments = createAction(
  '[Tournaments] Get tournaments'
);

const getTournamentsSuccess = createAction(
  '[Tournaments] Get tournaments success',
  props<{payload: Tournament[]}>()
);

const getTournamentsFailed = createAction(
  '[Tournaments] Get tournaments failed'
);

export const TournamentsActions = {
  getTournaments,
  getTournamentsSuccess,
  getTournamentsFailed
};
