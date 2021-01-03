import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './shared/layouts/home-layout.component';
import { AuthGuard } from './guards/auth-guard.service';
import { PublicUrls } from './shared/publicUrls';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home.module').then(m => m.HomeModule),
  },
  {
    path: PublicUrls.ADMIN,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
  },
  {
    path: PublicUrls.NOT_FOUND,
    component: HomeLayoutComponent,
    children: [{ path: '', component: NotfoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
