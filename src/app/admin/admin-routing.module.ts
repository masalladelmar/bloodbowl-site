import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoachesComponent } from './coaches/coaches.component';
import { CoachComponent } from './coaches/coach.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team.component';
import { AdminLayoutComponent } from '../shared/layouts/admin-layout.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { LinksComponent } from './links/links.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'coaches', component: CoachesComponent, canActivate: [AuthGuard] },
      { path: 'coaches/:coach', component: CoachComponent, canActivate: [AuthGuard] },
      { path: 'races', component: RacesComponent, canActivate: [AuthGuard] },
      { path: 'races/:race', component: RaceComponent, canActivate: [AuthGuard] },
      { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
      { path: 'teams/:team', component: TeamComponent, canActivate: [AuthGuard] },
      { path: 'links', component: LinksComponent, canActivate: [AuthGuard] },
      { path: 'posts', component: PostsComponent, canActivate: [AuthGuard], data: { type: 'posts' } },
      { path: 'posts/:id', component: PostComponent, canActivate: [AuthGuard], data: { type: 'posts' } },
      { path: 'chronicles', component: PostsComponent, canActivate: [AuthGuard], data: { type: 'chronicles' } },
      { path: 'chronicles/:id', component: PostComponent, canActivate: [AuthGuard], data: { type: 'chronicles' } },
      { path: 'photos', component: PostsComponent, canActivate: [AuthGuard], data: { type: 'photos' } },
      { path: 'photos/:id', component: PostComponent, canActivate: [AuthGuard], data: { type: 'photos' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
