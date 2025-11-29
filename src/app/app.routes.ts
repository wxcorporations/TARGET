import { Routes } from '@angular/router';

// import { Home } from './pages/home/home';
import { Home } from './presentation/pages/home/home';
import { Sales } from './presentation/pages/sales/sales';
import { Stock } from './presentation/pages/stock/stock';
import { Commissions } from './presentation/pages/commissions/commissions';


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
    },
    {
        path: 'stock',
        component: Stock
    }
];
