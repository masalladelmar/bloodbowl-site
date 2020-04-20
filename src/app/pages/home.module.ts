import { NgModule } from '@angular/core';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race.component';
import { CoachesComponent } from './coaches/coaches.component';
import { CoachComponent } from './coaches/coach.component';
import { TeamsComponent } from './teams/teams.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillComponent } from './skills/skill.component';
import { PhotoComponent } from './photos/photo.component';
import { PhotosComponent } from './photos/photos.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './posts/post.component';
import { HallFameComponent } from './hall-fame/hall-fame.component';
import { HallDeadComponent } from './hall-dead/hall-dead.component';
import { LoginComponent } from './login/login.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutModule } from '../shared/layouts/home-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    AccordionModule.forRoot(),
    HomeRoutingModule,
    HomeLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [],
})
export class HomeModule {}
