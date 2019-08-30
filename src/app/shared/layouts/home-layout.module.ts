import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesComponent } from 'src/app/pages/races/races.component';
import { RaceComponent } from 'src/app/pages/races/race.component';
import { CoachesComponent } from 'src/app/pages/coaches/coaches.component';
import { CoachComponent } from 'src/app/pages/coaches/coach.component';
import { TeamsComponent } from 'src/app/pages/teams/teams.component';
import { SkillsComponent } from 'src/app/pages/skills/skills.component';
import { SkillComponent } from 'src/app/pages/skills/skill.component';
import { LightboxModule } from 'ngx-lightbox';
import { PhotoComponent } from 'src/app/pages/photos/photo.component';
import { PhotosComponent } from 'src/app/pages/photos/photos.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PostComponent } from 'src/app/pages/posts/post.component';
import { HallFameComponent } from 'src/app/pages/hall-fame/hall-fame.component';
import { HallDeadComponent } from 'src/app/pages/hall-dead/hall-dead.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    RacesComponent,
    RaceComponent,
    CoachesComponent,
    CoachComponent,
    TeamsComponent,
    SkillsComponent,
    SkillComponent,
    PhotosComponent,
    PhotoComponent,
    HomeComponent,
    PostComponent,
    HallFameComponent,
    HallDeadComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
  ],
  providers: [],
})
export class HomeLayoutModule {}
