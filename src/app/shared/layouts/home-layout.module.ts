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
import { TournamentTeamComponent } from 'src/app/pages/tournaments/tournament-team.component';
import { TournamentStatsComponent } from 'src/app/pages/tournaments/tournament-stats.component';
import { TournamentRankingComponent } from 'src/app/pages/tournaments/tournament-ranking.component';
import { TournamentExperienceComponent } from 'src/app/pages/tournaments/tournament-experience.component';
import { TournamentJourneysComponent } from 'src/app/pages/tournaments/tournament-journeys.component';
import { TournamentJourneyComponent } from 'src/app/pages/tournaments/tournament-journey.component';
import { TournamentMatchesComponent } from 'src/app/pages/tournaments/tournament-matches.component';
import { TournamentMatchComponent } from 'src/app/pages/tournaments/tournament-match.component';
import { LightboxModule } from 'ngx-lightbox';
import { TournamentPlayoffsComponent } from 'src/app/pages/tournaments/tournament-playoffs.component';

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
    NotfoundComponent,
    TournamentTeamComponent,
    TournamentStatsComponent,
    TournamentRankingComponent,
    TournamentExperienceComponent,
    TournamentJourneysComponent,
    TournamentJourneyComponent,
    TournamentMatchesComponent,
    TournamentMatchComponent,
    TournamentPlayoffsComponent
  ],
  imports: [
    CommonModule,
    HomeLayoutRoutingModule,
    LightboxModule
  ],
  providers: []
})
export class HomeLayoutModule { }
