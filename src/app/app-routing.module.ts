import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent
  },
  { path: '**', redirectTo: '', component: HomeLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
