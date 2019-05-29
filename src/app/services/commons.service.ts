import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(
    private toastr: ToastrService
  ) {}

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
