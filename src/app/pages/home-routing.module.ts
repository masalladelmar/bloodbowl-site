import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../shared/layouts/home-layout.component';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race.component';
import { CoachesComponent } from './coaches/coaches.component';
import { CoachComponent } from './coaches/coach.component';
import { TeamsComponent } from './teams/teams.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillComponent } from './skills/skill.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoComponent } from './photos/photo.component';
import { PostComponent } from './posts/post.component';
import { HallFameComponent } from './hall-fame/hall-fame.component';
import { HallDeadComponent } from './hall-dead/hall-dead.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
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
      { path: 'posts/:post', component: PostComponent },
      { path: 'hall-of-fame', component: HallFameComponent },
      { path: 'hall-of-dead', component: HallDeadComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'tournaments',
        loadChildren: './tournaments/tournaments.module#TournamentsModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
