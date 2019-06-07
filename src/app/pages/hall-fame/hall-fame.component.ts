import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { HelperService } from 'src/app/services/helper.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-hall-fame',
  templateUrl: './hall-fame.component.html',
  styleUrls: ['./hall-fame.component.scss']
})
export class HallFameComponent implements OnInit {
  famous: any;

  constructor(
    private commonsService: CommonsService,
    private playersService: PlayersService,
    public helper: HelperService
  ) {
    this.commonsService.setLoading(true);
    this.commonsService.setTitle('Hall Of Fame');
    this.playersService.getFamous().subscribe(
      response => {
        this.famous = response;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar los jugadores famosos'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );
  }

  ngOnInit() {
  }

}
