import { Routes } from "@angular/router";

const routes: Routes = [

    {
        path: "",
        loadComponent: () => import("./products"),
    },
    {
        path: "product-create",
        loadComponent: () => import("./create/product-create"),
    },
    {
        path: "edit/:id",
        loadComponent: () => import("./create/product-create"),
    }

]

export default routes