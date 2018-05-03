import { Routes } from '@angular/router';

import { MainComponent } from './_components/main/main.component';
import { LoginComponent } from './_components/login/login.component';
// import { RegisterComponent } from './_components/register/register.component';

import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [

    { path: '', redirectTo: 'mappa/0', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', loadChildren: './_modules/registra/registra.module#RegistraModule' },
    { path: 'spesapx', loadChildren: './_modules/spesapx/spesapx.module#SpesapxModule' },
    { path: '', component: MainComponent, canActivate: [AuthGuard] ,
      children: [
        { path: 'chat', loadChildren: './_modules/chat/chat.module#ChatModule'},
        { path: 'mappa', loadChildren: './_modules/mappa/mappa.module#MappaModule'}
      ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
