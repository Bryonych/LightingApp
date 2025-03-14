import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.page';

const routes: Routes = [

    {
        path: 'index',
        component: IndexPage,
        children:[
          {
            path:'',
            loadChildren:() => import('../pages/welcome/welcome.module').then(m => m.WelcomePageModule)
          },
          {
            path: 'login',
            loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule),
          },
          {
            path: 'registration',
            loadChildren: () => import('../pages/registration/registration.module').then( m => m.RegistrationPageModule),
          }
        ]
    },

];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IndexRouter {}