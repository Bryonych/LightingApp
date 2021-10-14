import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProximityPageRoutingModule } from './proximity-routing.module';

import { ProximityPage } from './proximity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProximityPageRoutingModule
  ],
  declarations: [ProximityPage]
})
export class ProximityPageModule {}
