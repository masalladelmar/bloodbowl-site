import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { CoachesComponent } from 'src/app/admin/coaches/coaches.component';

export const admin_routes = [
    { path: '' , component: DashboardComponent },
    { path: 'coaches' , component: CoachesComponent }
];
