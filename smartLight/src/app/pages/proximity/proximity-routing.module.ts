import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProximityPage } from './proximity.page';

const routes: Routes = [
  {
    path: '',
    component: ProximityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProximityPageRoutingModule {}
