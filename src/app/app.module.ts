import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RacesComponent } from './pages/races/races.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { CoachesComponent } from './pages/coaches/coaches.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { SkillComponent } from './pages/skills/skill.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';
import { RaceComponent } from './pages/races/race.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TournamentComponent } from './pages/tournaments/tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RacesComponent,
    NotfoundComponent,
    CoachesComponent,
    TeamsComponent,
    SkillsComponent,
    SkillComponent,
    HomeLayoutComponent,
    RaceComponent,
    TournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
