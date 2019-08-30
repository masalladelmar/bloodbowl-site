import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AuthGuard } from './guards/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { RacesComponent } from './pages/races/races.component';
import { RaceComponent } from './pages/races/race.component';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { CoachComponent } from './pages/coaches/coach.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { SkillComponent } from './pages/skills/skill.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoComponent } from './pages/photos/photo.component';
import { PostComponent } from './pages/posts/post.component';
import { HallFameComponent } from './pages/hall-fame/hall-fame.component';
import { HallDeadComponent } from './pages/hall-dead/hall-dead.component';
import { LoginComponent } from './pages/login/login.component';
import { TournamentResolverService } from './services/tournament-resolver.service';

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
        path: 'tournaments/:tournament',
        loadChildren: './pages/tournaments/tournaments.module#TournamentsModule',
        resolve: {
          tournament: TournamentResolverService,
        },
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    component: HomeLayoutComponent,
    children: [{ path: '', component: NotfoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
