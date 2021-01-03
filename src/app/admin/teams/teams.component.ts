import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Team } from 'src/app/models/team.model';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private teamsService: TeamsService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.teamsService.getTeams().subscribe(
      data => {
        this.teams = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error, 'Se ha producido un error al recuperar los equipos'
        );
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() { }

  deleteTeam(team: Team) {
    const initialState = {
      bodyText: `¿Seguro que quieres eliminar el equipo ${team.name}?`,
    };
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
      class: 'modal-sm',
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.teamsService.delete(team.id).subscribe(
          data => {
            this.commonsService.handleSuccess('Equipo eliminado');
          },
          error => {
            this.commonsService.handleError(
              error, 'Se ha producido un error al intentar eliminar el equipo'
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }
}
