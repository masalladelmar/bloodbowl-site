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
  activeCoaches: ActiveCoach[];

  constructor(
    private coachesService: CoachesService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    forkJoin(
      this.coachesService.getCoaches(),
      this.coachesService.getActiveCoaches()
    ).subscribe(
      data => {
        this.coaches = data[0];
        this.activeCoaches = data[1];
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

  public in_use(coach_id: number): boolean {
    return this.activeCoaches.find(el => el.coach_id === coach_id) ? true : false;
  }
}
