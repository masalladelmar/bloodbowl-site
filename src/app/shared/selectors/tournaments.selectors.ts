import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TournamentsState } from '../reducers/tournaments.reducers';

export const selectTournamentsState = createFeatureSelector<TournamentsState>('tournaments');

export const selectTournaments = createSelector(selectTournamentsState, state => state.tournaments);
