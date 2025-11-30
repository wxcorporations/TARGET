import { Routes } from '@angular/router';

import { Stock } from './presentation/pages/stock/stock';
import { Commissions } from './presentation/pages/commissions/commissions';

export const routes: Routes = [
    {
        path: 'commissions',
        component: Commissions
    },
    {
        path: '',
        component: Stock
    }
];
