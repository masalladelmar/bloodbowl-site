import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoachesComponent } from 'src/app/admin/coaches/coaches.component';
import { CoachComponent } from 'src/app/admin/coaches/coach.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CoachesComponent,
    CoachComponent
  ],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: []
})
export class AdminLayoutModule { }
