import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacesComponent } from './pages/races/races.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { SkillComponent } from './pages/skills/skill.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';

const routes: Routes = [
  {
    path: '',
      component: HomeLayoutComponent,
      children: [
        { path: 'races', component: RacesComponent },
        { path: 'coaches', component: CoachesComponent },
        { path: 'teams', component: TeamsComponent },
        { path: 'skills', component: SkillsComponent },
        { path: 'skills/:type', component: SkillComponent },
        { path: '**', component: NotfoundComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }