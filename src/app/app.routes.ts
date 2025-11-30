import { Routes } from '@angular/router';

// import { Home } from './pages/home/home';
import { Home } from './presentation/pages/home/home';
import { Stock } from './presentation/pages/stock/stock';
import { Commissions } from './presentation/pages/commissions/commissions';


export const routes: Routes = [
    {
        path: '',
        component: Home
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
