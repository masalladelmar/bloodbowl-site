import { NgModule } from '@angular/core';

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
import { AdminFooterComponent } from '../shared/footer/admin-footer.component';
import { AdminHeaderComponent } from '../shared/header/admin-header.component';
import { AdminLayoutComponent } from '../shared/layouts/admin-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LinksComponent } from './links/links.component';
import { LinkComponent } from './links/link.component';

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
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    LinksComponent,
    LinkComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    TooltipModule.forRoot()
  ],
  entryComponents: [ConfirmationModalComponent, PositionComponent, PlayerComponent, LinkComponent],
})
export class AdminModule { }
