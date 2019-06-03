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
            component: TournamentComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'experience',
            component: TournamentComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'ranking',
            component: TournamentComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'journeys',
            component: TournamentComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'matches',
            component: TournamentComponent,
            resolve: {
              tournament: TournamentResolverService
            }
          },
          {
            path: 'playoffs',
            component: TournamentComponent,
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
