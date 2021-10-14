import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColoursPageRoutingModule } from './colours-routing.module';

import { ColoursPage } from './colours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColoursPageRoutingModule
  ],
  declarations: [ColoursPage]
})
export class ColoursPageModule {}
