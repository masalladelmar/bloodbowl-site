import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacesComponent } from './pages/races/races.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { SkillComponent } from './pages/skills/skill.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';
import { RaceComponent } from './pages/races/race.component';
import { TournamentComponent } from './pages/tournaments/tournament.component';
import { CoachComponent } from './pages/coaches/coach.component';

const routes: Routes = [
  {
    path: '',
      component: HomeLayoutComponent,
      children: [
        { path: 'races', component: RacesComponent },
        { path: 'races/:race', component: RaceComponent },
        { path: 'coaches', component: CoachesComponent },
        { path: 'coaches/:coach', component: CoachComponent },
        { path: 'teams', component: TeamsComponent },
        { path: 'skills', component: SkillsComponent },
        { path: 'skills/:type', component: SkillComponent },
        // { path: 'tournaments', component: },
        { path: 'tournaments/:tournament', component: TournamentComponent },
        { path: 'tournaments/:tournament/teams', component: TournamentComponent },
        { path: 'tournaments/:tournament/stats', component: TournamentComponent },
        { path: 'tournaments/:tournament/experience', component: TournamentComponent },
        { path: 'tournaments/:tournament/ranking', component: TournamentComponent },
        { path: 'tournaments/:tournament/journeys', component: TournamentComponent },
        { path: 'tournaments/:tournament/matches', component: TournamentComponent },
        { path: 'tournaments/:tournament/playoffs', component: TournamentComponent },
        { path: '**', component: NotfoundComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
