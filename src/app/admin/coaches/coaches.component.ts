import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Coach } from 'src/app/models/coach.model';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit {
  coaches: Coach[];
  selected: Coach;
  modalRef: BsModalRef;

  constructor(
    private coachesService: CoachesService,
    private commonsService: CommonsService,
    private modalService: BsModalService
  ) {
    this.commonsService.setLoading(true);
    this.coachesService.getCoaches().subscribe(
      data => {
        this.coaches = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error, 'Se ha producido un error al recuperar los entrenadores'
        );
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() { }

  deleteCoach(coach: Coach) {
    const initialState = {
      bodyText: `¿Seguro que quieres eliminar al entrenador ${coach.name}?`,
    };
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
      class: 'modal-sm',
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.coachesService.delete(coach.id).subscribe(
          data => {
            this.commonsService.handleSuccess('Entrenador eliminado');
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al eliminar al entrenador'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }
}
