import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m=> m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m=> m.HomePageModule),
    canActivate: [AuthGuard]
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
