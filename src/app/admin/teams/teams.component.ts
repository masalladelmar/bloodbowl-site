import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { ModalService } from 'src/app/services/modal.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Team } from 'src/app/models/team.model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: Team[];

  constructor(
    private modalService: ModalService,
    private teamsService: TeamsService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.teamsService.getTeams()
    .subscribe(
      data => {
        this.teams = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los equipos'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }

  deleteTeam(team: Team) {
    const inputs = {
      bodyText: `¿Seguro que quieres eliminar el equipo ${team.name}?`
    };
    const outputs = {};
    this.modalService.init(ConfirmationModalComponent, inputs, outputs);
    const modalOutput$ = this.modalService.getOutput().subscribe(
      response => {
        if (response === true) {
          modalOutput$.unsubscribe();
          this.teamsService.delete(team.id).subscribe(
            data => {
              this.commonsService.handleSuccess('Equipo eliminado');
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al intentar eliminar el equipo'
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
