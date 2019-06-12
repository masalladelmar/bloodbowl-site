import { LoginComponent } from 'src/app/pages/login/login.component';
import { HallDeadComponent } from 'src/app/pages/hall-dead/hall-dead.component';
import { HallFameComponent } from 'src/app/pages/hall-fame/hall-fame.component';
import { PostComponent } from 'src/app/pages/posts/post.component';
import { PhotoComponent } from 'src/app/pages/photos/photo.component';
import { PhotosComponent } from 'src/app/pages/photos/photos.component';
import { SkillComponent } from 'src/app/pages/skills/skill.component';
import { SkillsComponent } from 'src/app/pages/skills/skills.component';
import { TeamsComponent } from 'src/app/pages/teams/teams.component';
import { CoachComponent } from 'src/app/pages/coaches/coach.component';
import { CoachesComponent } from 'src/app/pages/coaches/coaches.component';
import { RaceComponent } from 'src/app/pages/races/race.component';
import { RacesComponent } from 'src/app/pages/races/races.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { TournamentResolverService } from 'src/app/services/tournament-resolver.service';
import { tournament_routes } from 'src/app/pages/tournaments/tournament-routes';

export const home_routes = [
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
    component: LoginComponent
  },
  {
    path: 'tournaments/:tournament',
    resolve: {
      tournament: TournamentResolverService
    },
    children: tournament_routes
  }
];
