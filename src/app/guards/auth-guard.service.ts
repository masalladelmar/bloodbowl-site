import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonsService } from '../services/commons.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private commonsService: CommonsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem('googleToken')) {
      this.commonsService.setReturnUrl(state.url);
      this.commonsService.handleWarning('Debes estar logueado para acceder a esta pantalla');
      this.router.navigate(['/login']);
      return false;
    }
    this.commonsService.setReturnUrl(null);
    return true;
  }
}
