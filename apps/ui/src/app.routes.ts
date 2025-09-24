import { Route } from '@angular/router';
import { authGuard } from './guard/auth-guard';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () => import("./pages/layouts/layouts"),
        children: [
            {
                path: "",
                loadComponent: () => import("./pages/home/home")
            },
            {
                path: "products/:categoryKey",
                loadComponent: () => import("./pages/home/home")
            },
            {
                path: "auth",
                loadChildren: () => import("./pages/auth/routes")
            },
            {
                path: "baskets",
                loadComponent: () => import("./pages/basket/basket"),
                canActivate: [authGuard]
            },
            {
                path: "payment",
                loadComponent: () => import("./pages/payment/payment"),
                canActivate: [authGuard]
            }

        ]
    }
];
