import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Sales } from './pages/sales/sales';
import { Commissions } from './pages/commissions/commissions';


export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'sales',
        component: Sales
    },
    {
        path: 'commissions',
        component: Commissions
    }
];
