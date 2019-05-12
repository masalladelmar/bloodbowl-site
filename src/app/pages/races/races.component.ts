import { Component, OnInit } from '@angular/core';
import { RacesService } from 'src/app/services/races.service';
import { Race } from 'src/app/models/race.model';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  races: Race[];

  constructor(
    private raceService: RacesService
  ) { }

  ngOnInit() {
    this.raceService.getRaces().subscribe(
      data => this.races = data,
      err => this.handleError('Error al recuperar las razas')
    );
  }

  private handleError(message: string) {
    console.error(message);
  }
}
