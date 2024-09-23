import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewAllLaptopsComponent } from './view-all-laptops/view-all-laptops.component';

export const routes: Routes = [
    {
        path:"add",
        component:AddComponent
    },
    {
        path:"viewtable",
        component:ViewAllComponent
    },
    {
        path:"viewlaptop",
        component:ViewAllLaptopsComponent
    }

];
