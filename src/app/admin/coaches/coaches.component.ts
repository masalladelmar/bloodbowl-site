import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Coach } from 'src/app/models/coach.model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coaches: Coach[];
  selected: Coach;

  constructor(
    private coachesService: CoachesService,
    private commonsService: CommonsService,
    private modalService: ModalService
  ) {
    this.commonsService.setLoading(true);
    this.coachesService.getCoaches()
    .subscribe(
      data => {
        this.coaches = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los entrenadores'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }

  deleteCoach(coach: Coach) {
    const inputs = {
      bodyText: `¿Seguro que quieres eliminar al entrenador ${coach.name}?`
    };
    const outputs = {};
    this.modalService.init(ConfirmationModalComponent, inputs, outputs);
    const modalOutput$ = this.modalService.getOutput().subscribe(
      response => {
        if (response === true) {
          modalOutput$.unsubscribe();
          this.coachesService.delete(coach.id).subscribe(
            data => {
              this.commonsService.handleSuccess('Entrenador eliminado');
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al eliminar al entrenador'
                : error.message);
              this.commonsService.setLoading(false);
            }
          );
        }
        if (response === false) {
          modalOutput$.unsubscribe();
        }
      }
    );
  }
}
