import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacesComponent } from 'src/app/pages/races/races.component';
import { RaceComponent } from 'src/app/pages/races/race.component';
import { CoachesComponent } from 'src/app/pages/coaches/coaches.component';
import { CoachComponent } from 'src/app/pages/coaches/coach.component';
import { TeamsComponent } from 'src/app/pages/teams/teams.component';
import { SkillsComponent } from 'src/app/pages/skills/skills.component';
import { SkillComponent } from 'src/app/pages/skills/skill.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { TournamentComponent } from 'src/app/pages/tournaments/tournament.component';
import { TournamentTeamsComponent } from 'src/app/pages/tournaments/tournament-teams.component';
import { HomeLayoutComponent } from './home-layout.component';
import { TournamentResolverService } from 'src/app/services/tournament-resolver.service';
import { TournamentTeamComponent } from 'src/app/pages/tournaments/tournament-team.component';
import { TournamentStatsComponent } from 'src/app/pages/tournaments/tournament-stats.component';
import { TournamentRankingComponent } from 'src/app/pages/tournaments/tournament-ranking.component';
import { TournamentExperienceComponent } from 'src/app/pages/tournaments/tournament-experience.component';
import { TournamentJourneysComponent } from 'src/app/pages/tournaments/tournament-journeys.component';
import { TournamentJourneyComponent } from 'src/app/pages/tournaments/tournament-journey.component';
import { TournamentMatchesComponent } from 'src/app/pages/tournaments/tournament-matches.component';
import { TournamentMatchComponent } from 'src/app/pages/tournaments/tournament-match.component';
import { TournamentPlayoffsComponent } from 'src/app/pages/tournaments/tournament-playoffs.component';
import { PhotosComponent } from 'src/app/pages/photos/photos.component';
import { PhotoComponent } from 'src/app/pages/photos/photo.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'races', component: RacesComponent },
      { path: 'races/:race', component: RaceComponent },
      { path: 'coaches', component: CoachesComponent },
      { path: 'coaches/:coach', component: CoachComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:team', component: TeamsComponent },
      { path: 'teams/:team/print', component: TeamsComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'skills/:type', component: SkillComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'photos/:photo', component: PhotoComponent },
      {
        path: 'tournaments/:tournament',
        resolve: {
          tournament: TournamentResolverService
        },
        children: [
          {
            path: '',
            component: TournamentComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'teams',
            component: TournamentTeamsComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'teams/:team',
            component: TournamentTeamComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'stats',
            component: TournamentStatsComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'experience',
            component: TournamentExperienceComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'ranking',
            component: TournamentRankingComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'journeys',
            component: TournamentJourneysComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'journeys/:journey',
            component: TournamentJourneyComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'matches',
            component: TournamentMatchesComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'matches/:match',
            component: TournamentMatchComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'playoffs',
            component: TournamentPlayoffsComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
        ]
      }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: [TournamentResolverService]
})
export class HomeLayoutRoutingModule { }
