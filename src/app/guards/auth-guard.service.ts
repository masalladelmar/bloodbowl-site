import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
} from '@angular/router';
import { CommonsService } from '../services/commons.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private commonsService: CommonsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(route);
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  private checkLogin(route?: ActivatedRouteSnapshot): boolean {
    if (!localStorage.getItem('googleToken')) {
      this.commonsService.setReturnUrl(route.pathFromRoot.map(r => r.url).join('/'));
      this.commonsService.handleWarning(
        'Debes estar logueado para acceder a esta pantalla'
      );
      this.router.navigate(['/login']);
      return false;
    }
    this.commonsService.setReturnUrl(null);
    return true;
  }
}
