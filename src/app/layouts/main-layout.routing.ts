import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DeviceHistoryComponent } from '../reports/devicehistory.component';

export const MainLayoutRoutes: Routes = [
    { path: '',      component: DashboardComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'devicereport',      component: DeviceHistoryComponent }
];
