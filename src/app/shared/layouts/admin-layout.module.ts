import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoachesComponent } from 'src/app/admin/coaches/coaches.component';
import { CoachComponent } from 'src/app/admin/coaches/coach.component';
import { RaceComponent } from 'src/app/admin/races/race.component';
import { RacesComponent } from 'src/app/admin/races/races.component';
import { PositionComponent } from 'src/app/admin/positions/position.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { TeamComponent } from 'src/app/admin/teams/team.component';
import { TeamsComponent } from 'src/app/admin/teams/teams.component';
import { PlayerComponent } from 'src/app/admin/players/player.component';

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
    PlayerComponent
  ],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    ConfirmationModalComponent,
    PositionComponent,
    PlayerComponent
  ],
  providers: []
})
export class AdminLayoutModule { }
