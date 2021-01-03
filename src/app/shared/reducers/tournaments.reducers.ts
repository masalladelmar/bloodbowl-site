import { createReducer, on } from '@ngrx/store';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentsActions } from '../actions/tournaments.actions';


export interface TournamentsState {
  tournaments: Tournament[];
  isLoading: boolean;
}

export const tournamentsInitialState: TournamentsState = {
  tournaments: null,
  isLoading: false
};

export const tournamentsReducers = createReducer(
  tournamentsInitialState,
  on(TournamentsActions.getTournaments, (state, action) => {
    return {
      ...state,
      tournaments: null,
      isLoading: true
    };
  }),

  on(TournamentsActions.getTournamentsSuccess, (state, action) => {
    return {
      ...state,
      tournaments: action.payload,
      isLoading: false
    };
  }),

  on(TournamentsActions.getTournamentsFailed, (state, action) => {
    return {
      ...state,
      tournaments: null,
      isLoading: false
    };
  })
);
