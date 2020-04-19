import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { CommonsService } from 'src/app/services/commons.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
  tournamentSelected: Tournament;
  title$: Observable<string>;
  subscriptions: Subscription = new Subscription();

  constructor(
    private commonsService: CommonsService
  ) {
    // Suscripciones del servicio común
    this.subscriptions.add(
      this.commonsService.getTournament().subscribe(res => this.tournamentSelected = res)
    );
    this.title$ = this.commonsService.getTitle();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
