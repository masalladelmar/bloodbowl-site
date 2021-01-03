import { ActionReducerMap } from '@ngrx/store';
import { tournamentsReducers } from './tournaments.reducers';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
 tournaments: tournamentsReducers
};
