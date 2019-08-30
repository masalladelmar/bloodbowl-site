import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentComponent } from './tournament.component';
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

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentTeamsComponent,
    TournamentTeamComponent,
    TournamentStatsComponent,
    TournamentExperienceComponent,
    TournamentRankingComponent,
    TournamentJourneysComponent,
    TournamentJourneyComponent,
    TournamentMatchesComponent,
    TournamentMatchComponent,
    TournamentPlayoffsComponent,
    TournamentPlayoffMatchComponent,
  ],
  imports: [CommonModule, TournamentsRoutingModule],
})
export class TournamentsModule {}
