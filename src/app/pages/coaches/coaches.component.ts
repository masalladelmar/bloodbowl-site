import { Component, OnInit } from '@angular/core';
import { CoachesService } from 'src/app/services/coaches.service';
import { Coach } from 'src/app/models/coach.model';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coaches: Coach[];

  constructor(
    private coachesService: CoachesService
  ) { }

  ngOnInit() {
    this.coachesService.getCoaches().subscribe(
      data => this.coaches = data
    );
  }

}
