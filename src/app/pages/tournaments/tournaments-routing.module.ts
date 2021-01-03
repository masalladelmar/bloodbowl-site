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
import { PublicUrls } from 'src/app/shared/publicUrls';

const routes: Routes = [
  {
    path: PublicUrls.TOURNAMENTS_DETAIL,
    component: TournamentComponent,
    pathMatch: 'full',
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_TEAMS,
    component: TournamentTeamsComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_TEAMS_DEAIL,
    component: TournamentTeamComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_STATS,
    component: TournamentStatsComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_XP,
    component: TournamentExperienceComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_RANKING,
    component: TournamentRankingComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_JOURNEYS,
    component: TournamentJourneysComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_JOURNEYS_DETAIL,
    component: TournamentJourneyComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_MATCHES,
    component: TournamentMatchesComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_MATCHES_DETAIL,
    component: TournamentMatchComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_PLAYOFFS,
    component: TournamentPlayoffsComponent,
    resolve: {
      tournament: TournamentResolverService,
    },
  },
  {
    path: PublicUrls.TOURNAMENTS_PLAYOFFS_DETAIL,
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
