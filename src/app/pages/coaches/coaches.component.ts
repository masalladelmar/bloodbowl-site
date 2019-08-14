import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { Coach } from 'src/app/models/coach.model';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coaches: Coach[];

  constructor(
    private coachesService: CoachesService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Listado de entrenadores');
    this.coachesService.getCoachesWithTeams().subscribe(
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

}
