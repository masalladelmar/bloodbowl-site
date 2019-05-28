import { Component, OnInit } from '@angular/core';
import { RacesService } from 'src/app/services/races.service';
import { Race } from 'src/app/models/race.model';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  races: Race[];
  loading: boolean;

  constructor(
    private raceService: RacesService,
    private commonsService: CommonsService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.raceService.getRaces().subscribe(
      data => {
        this.races = data;
        this.loading = false;
      },
      err => {
        this.commonsService.handleError(err);
        this.loading = false;
      }
    );
  }
}
