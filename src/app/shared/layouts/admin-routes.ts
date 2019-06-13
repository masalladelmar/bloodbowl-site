import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { CoachesComponent } from 'src/app/admin/coaches/coaches.component';
import { CoachComponent } from 'src/app/admin/coaches/coach.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

export const admin_routes = [
    { path: '' , component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'coaches' , component: CoachesComponent, canActivate: [AuthGuard] },
    { path: 'coaches/:coach' , component: CoachComponent, canActivate: [AuthGuard] }
];
