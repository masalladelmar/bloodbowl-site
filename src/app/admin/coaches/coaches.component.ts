import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Coach, ActiveCoach } from 'src/app/models/coach.model';
import { forkJoin } from 'rxjs';

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
    private commonsService: CommonsService
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

  public showModal(coach: Coach) {
    this.selected = coach;
    document.getElementById('confirmation-modal').classList.add('active');
  }

  public closeModal() {
    this.selected = null;
    document.getElementById('confirmation-modal').classList.remove('active');
  }

  public deleteCoach() {
    this.commonsService.setLoading(true);
    this.coachesService.delete(this.selected.id).subscribe(
      response => {
        this.coaches = this.coaches.filter(el => el.id !== this.selected.id);
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al eliminar el entrenador'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }
}
