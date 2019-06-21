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

  handleError(message: string) {
    this.toastr.error(message, null, {
      toastClass: 'toast toast-error'
    });
  }

  handleSuccess(message: string) {
    this.toastr.success(message, null, {
      toastClass: 'toast toast-success'
    });
  }

  handleWarning(message: string) {
    this.toastr.success(message, null, {
      toastClass: 'toast toast-warning'
    });
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
