import { Component, OnInit } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { RacesService } from 'src/app/services/races.service';
import { forkJoin } from 'rxjs';
import { Race, ActiveRace } from 'src/app/models/race.model';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  races: Race[];

  constructor(
    private modalService: ModalService,
    private racesService: RacesService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.racesService.getRaces()
    .subscribe(
      data => {
        this.races = data;
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

  deleteRace(race: Race) {
    const inputs = {
      bodyText: `¿Seguro que quieres eliminar la raza ${race.name}?`
    };
    const outputs = {};
    this.modalService.init(ConfirmationModalComponent, inputs, outputs);
    const modalOutput$ = this.modalService.getOutput().subscribe(
      response => {
        if (response === true) {
          modalOutput$.unsubscribe();
          this.racesService.delete(race.id).subscribe(
            data => {
              this.commonsService.handleSuccess('Raza eliminada');
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al recuperar los entrenadores'
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
