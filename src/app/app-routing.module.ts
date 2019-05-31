import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent
  }/*,
  {
    path: 'login',
    component:
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
