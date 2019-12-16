import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {
  private tournament: BehaviorSubject<Tournament>;
  private title: BehaviorSubject<string>;
  private loading: BehaviorSubject<boolean>;
  private _photosRoute: string;
  private _returnUrl: string;

  constructor(
    private toastr: ToastrService
  ) {
    this.tournament = new BehaviorSubject<Tournament>(null);
    this.title = new BehaviorSubject<string>('');
    this.loading = new BehaviorSubject<boolean>(false);
    this._photosRoute = 'uploads/photos/';
  }

  setTournament(t: Tournament) {
    this.tournament.next(t);
  }

  getTournament(): Observable<Tournament> {
    return this.tournament.asObservable();
  }

  setReturnUrl(url: string) {
    this._returnUrl = url;
  }

  getReturnUrl(): string {
    return this._returnUrl;
  }

  setTitle(t: string) {
    this.title.next(t);
  }

  getTitle(): Observable<string> {
    return this.title.asObservable();
  }

  setLoading(l: boolean) {
    if (l !== this.loading.value) {
      this.loading.next(l);
    }
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  handleError(error: string | Response, optMessage = '') {
    if (typeof error === 'string') {
      this.toastr.error(error, 'Error', {});
    } else {
      let message = '';
      console.error(error);
      switch (error.status) {
        case 500:
          message = optMessage || error.statusText;
          break;
        case 404:
          message = 'No se ha encontrado en la API el punto de acceso especificado';
          break;
        case 401:
          message = 'El token ha caducado. Debes iniciar sesión de nuevo';
          break;
        default:
          message = error.statusText;
      }

      this.toastr.error(message, 'Error', {});
    }
  }

  handleSuccess(message: string) {
    this.toastr.success(message, null, {});
  }

  handleWarning(message: string) {
    this.toastr.success(message, 'Aviso', {});
  }

  get photosRoute(): string {
    return this._photosRoute;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
