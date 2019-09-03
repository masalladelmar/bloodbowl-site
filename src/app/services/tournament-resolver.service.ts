import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TournamentsService } from './tournaments.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentResolverService implements Resolve<any> {
  constructor(private tournamentsService: TournamentsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    return this.tournamentsService.getTournament(route.params['tournament']);
  }
}
