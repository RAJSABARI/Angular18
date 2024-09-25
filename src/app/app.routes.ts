import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewAllLaptopsComponent } from './view-all-laptops/view-all-laptops.component';
import { EditComponent } from './edit/edit.component';
import { EditpersonComponent } from './editperson/editperson.component';

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
    },
    {
        path:"editComponenet/:lno",
        component:EditComponent
    },
    {
        path:"editpersonComponent/:rollno",
        component:EditpersonComponent
    }
    

];
