import { Routes } from '@angular/router';

import { MainComponent } from './_components/main/main.component';
import { LoginComponent } from './_components/login/login.component';
// import { RegisterComponent } from './_components/register/register.component';

import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [

    { path: '', redirectTo: 'mappa/0', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'registra', loadChildren: () => import('./_modules/registra/registra.module').then(m => m.RegistraModule) },
    { path: 'spesapx', loadChildren: () => import('./_modules/spesapx/spesapx.module').then(m => m.SpesapxModule) },
    { path: '', component: MainComponent, canActivate: [AuthGuard] ,
      children: [
        { path: 'chat', loadChildren: () => import('./_modules/chat/chat.module').then(m => m.ChatModule)},
        { path: 'mappa', loadChildren: () => import('./_modules/mappa/mappa.module').then(m => m.MappaModule)}
      ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
