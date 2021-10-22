import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
{
    path: 'home',
    component: HomePage,
    children:[
      {
        path: 'scan',
        loadChildren: () => import('../pages/scan/scan.module').then( m => m.ScanPageModule),
      },
      {
          path:'controller',
          loadChildren:() => import('../pages/controller/controller.module').then(m => m.ControllerPageModule),
      },
      {
          path: 'proximity',
          loadChildren: () => import('../pages/proximity/proximity.module').then( m => m.ProximityPageModule),
      }
       
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