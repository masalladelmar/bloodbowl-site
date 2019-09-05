import { Component, OnInit } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { RacesService } from 'src/app/services/races.service';
import { Race } from 'src/app/models/race.model';
import { CommonsService } from 'src/app/services/commons.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
})
export class RacesComponent implements OnInit {
  races: Race[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private racesService: RacesService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.racesService.getRaces().subscribe(
      data => {
        this.races = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error.status === 500
            ? 'Se ha producido un error al recuperar los entrenadores'
            : error.message
        );
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {}

  deleteRace(race: Race) {
    const initialState = {
      bodyText: `¿Seguro que quieres eliminar la raza ${race.name}?`,
    };
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
      class: 'modal-sm',
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.racesService.delete(race.id).subscribe(
          data => {
            this.commonsService.handleSuccess('Raza eliminada');
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al recuperar los entrenadores'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }
}
