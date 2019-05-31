import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { TournamentComponent } from 'src/app/pages/tournaments/tournament.component';
import { TournamentTeamsComponent } from 'src/app/pages/tournaments/tournament-teams.component';
import { RacesComponent } from 'src/app/pages/races/races.component';
import { RaceComponent } from 'src/app/pages/races/race.component';
import { CoachesComponent } from 'src/app/pages/coaches/coaches.component';
import { CoachComponent } from 'src/app/pages/coaches/coach.component';
import { TeamsComponent } from 'src/app/pages/teams/teams.component';
import { SkillsComponent } from 'src/app/pages/skills/skills.component';
import { SkillComponent } from 'src/app/pages/skills/skill.component';
import { NotfoundComponent } from '../notfound/notfound.component';

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentTeamsComponent,
    RacesComponent,
    RaceComponent,
    CoachesComponent,
    CoachComponent,
    TeamsComponent,
    SkillsComponent,
    SkillComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    HomeLayoutRoutingModule
  ],
  providers: []
})
export class HomeLayoutModule { }
