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
import { PhotoComponent } from 'src/app/pages/photos/photo.component';
import { PhotosComponent } from 'src/app/pages/photos/photos.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PostComponent } from 'src/app/pages/posts/post.component';
import { HallFameComponent } from 'src/app/pages/hall-fame/hall-fame.component';
import { HallDeadComponent } from 'src/app/pages/hall-dead/hall-dead.component';
import { TournamentPlayoffMatchComponent } from 'src/app/pages/tournaments/tournament-playoff-match.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';

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
    TournamentPlayoffsComponent,
    PhotosComponent,
    PhotoComponent,
    HomeComponent,
    PostComponent,
    HallFameComponent,
    HallDeadComponent,
    TournamentPlayoffMatchComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HomeLayoutRoutingModule,
    LightboxModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class HomeLayoutModule { }
