import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
{
    path: 'home',
    component: HomePage,
    children:[
        {
            path:'controller',
            loadChildren:() => import('../pages/controller/controller.module').then(m => m.ControllerPageModule)
        },
        {
            path: 'proximity',
            loadChildren: () => import('../pages/proximity/proximity.module').then( m => m.ProximityPageModule)
          },
          {
            path: 'colours',
            loadChildren: () => import('../pages/colours/colours.module').then( m => m.ColoursPageModule)
          },
    ]
}
  
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRouter {}