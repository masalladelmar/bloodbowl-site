import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('loading', [
      state('off', style({
        'opacity': '0',
        'display': 'none'
      })),
      state('on', style({
        'opacity': '1',
        'display': 'flex'
      })),
      transition('off => on', animate('300ms ease-in')),
      transition('on => off', animate('300ms ease-out'))
    ])
  ]
})
export class SpinnerComponent implements OnInit, OnDestroy {
  loading$: Subscription;
  private loading = 'off';

  constructor(
    private commonsService: CommonsService
  ) { }

  public get state(): string {
    return this.loading;
  }

  ngOnInit() {
    this.loading$ = this.commonsService.getLoading().subscribe(
      data => this.loading = data ? 'on' : 'off'
    );
  }

  ngOnDestroy() {
    this.loading$.unsubscribe();
  }
}
