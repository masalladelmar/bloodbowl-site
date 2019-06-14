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
  activeRaces: ActiveRace[];

  constructor(
    private modalService: ModalService,
    private racesService: RacesService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    forkJoin(
      this.racesService.getRaces(),
      // this.racesService.getActiveCoaches()
    ).subscribe(
      data => {
        this.races = data[0];
        // this.activeRaces = data[1];
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

  confirmationModal() {
    const inputs = {
      bodyText: '¿Seguro que quieres eliminar esta raza?'
    };
    const outputs = {};
    this.modalService.init(ConfirmationModalComponent, inputs, outputs);
  }

  public inUse(race_id: number): boolean {
    return false;
    return this.activeRaces.find(el => el.race_id === race_id) ? true : false;
  }
}
