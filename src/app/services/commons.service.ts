import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {
  tournament: BehaviorSubject<Tournament>;
  title: BehaviorSubject<string>;
  loading: BehaviorSubject<boolean>;

  constructor(
    private toastr: ToastrService
  ) {
    this.tournament = new BehaviorSubject<Tournament>(null);
    this.title = new BehaviorSubject<string>('');
    this.loading = new BehaviorSubject<boolean>(false);
  }

  setTournament(t: Tournament) {
    this.tournament.next(t);
  }

  getTournament(): Observable<Tournament> {
    return this.tournament.asObservable();
  }

  setTitle(t: string) {
    this.title.next(t);
  }

  getTitle(): Observable<string> {
    return this.title.asObservable();
  }

  setLoading(l: boolean) {
    if (l !== this.loading.value) {
      console.log(l);
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
}
