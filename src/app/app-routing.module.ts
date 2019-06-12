import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout.component';
import { admin_routes } from './shared/layouts/admin-routes';
import { home_routes } from './shared/layouts/home-routes';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: home_routes
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: admin_routes
  },
  { path: '**',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: NotfoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
