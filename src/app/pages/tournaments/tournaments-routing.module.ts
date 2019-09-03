import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { TournamentResolverService } from 'src/app/services/tournament-resolver.service';
import { TournamentTeamsComponent } from './tournament-teams.component';
import { TournamentTeamComponent } from './tournament-team.component';
import { TournamentStatsComponent } from './tournament-stats.component';
import { TournamentExperienceComponent } from './tournament-experience.component';
import { TournamentRankingComponent } from './tournament-ranking.component';
import { TournamentJourneysComponent } from './tournament-journeys.component';
import { TournamentJourneyComponent } from './tournament-journey.component';
import { TournamentMatchesComponent } from './tournament-matches.component';
import { TournamentMatchComponent } from './tournament-match.component';
import { TournamentPlayoffsComponent } from './tournament-playoffs.component';
import { TournamentPlayoffMatchComponent } from './tournament-playoff-match.component';

const routes: Routes = [
  {
    path: ':tournament',
    component: TournamentComponent,
    pathMatch: 'full',
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/teams',
    component: TournamentTeamsComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/teams/:team',
    component: TournamentTeamComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/stats',
    component: TournamentStatsComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/experience',
    component: TournamentExperienceComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/ranking',
    component: TournamentRankingComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/journeys',
    component: TournamentJourneysComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/journeys/:journey',
    component: TournamentJourneyComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/matches',
    component: TournamentMatchesComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/matches/:match',
    component: TournamentMatchComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/playoffs',
    component: TournamentPlayoffsComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: ':tournament/playoffs/:match',
    component: TournamentPlayoffMatchComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsRoutingModule {}
