import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoachesComponent } from './coaches/coaches.component';
import { CoachComponent } from './coaches/coach.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race.component';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { PositionComponent } from './positions/position.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team.component';
import { PlayerComponent } from './players/player.component';
import { LightboxModule } from 'ngx-lightbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    CoachesComponent,
    CoachComponent,
    RacesComponent,
    RaceComponent,
    ConfirmationModalComponent,
    PositionComponent,
    TeamsComponent,
    TeamComponent,
    PlayerComponent,
  ],
  imports: [CommonModule, LightboxModule, ReactiveFormsModule, AdminRoutingModule],
  entryComponents: [ConfirmationModalComponent, PositionComponent, PlayerComponent],
})
export class AdminModule {}
