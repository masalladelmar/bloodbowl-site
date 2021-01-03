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
import { PublicUrls } from '../shared/publicUrls';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: PublicUrls.RACES, component: RacesComponent },
      { path: PublicUrls.RACES_DETAIL, component: RaceComponent },
      { path: PublicUrls.COACHES, component: CoachesComponent },
      { path: PublicUrls.COACHES_DETAIL, component: CoachComponent },
      { path: PublicUrls.TEAMS, component: TeamsComponent },
      { path: PublicUrls.TEAMS_DETAIL, component: TeamsComponent },
      { path: PublicUrls.TEAMS_PRINT, component: TeamsComponent },
      { path: PublicUrls.SKILLS, component: SkillsComponent },
      { path: PublicUrls.SKILLS_TYPE, component: SkillComponent },
      { path: PublicUrls.PHOTOS, component: PhotosComponent },
      { path: PublicUrls.PHOTOS_DETAIL, component: PhotoComponent },
      { path: PublicUrls.POSTS_DETAIL, component: PostComponent },
      { path: PublicUrls.HALL_OF_FAME, component: HallFameComponent },
      { path: PublicUrls.HALL_OF_DEAD, component: HallDeadComponent },
      {
        path: PublicUrls.LOGIN,
        component: LoginComponent,
      },
      {
        path: PublicUrls.TOURNAMENTS,
        loadChildren: () => import('./tournaments/tournaments.module').then(m => m.TournamentsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
