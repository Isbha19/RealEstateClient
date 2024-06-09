import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

export const routes: Routes = [
    {path:'',component:AppComponent},
    {path:"not-found",component:NotFoundComponent},
    {path:'**',component:NotFoundComponent}
];
