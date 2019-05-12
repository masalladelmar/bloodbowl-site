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
    SkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
