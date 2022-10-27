import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedStorePageRoutingModule } from './selected-store-routing.module';

import { SelectedStorePage } from './selected-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedStorePageRoutingModule
  ],
  declarations: [SelectedStorePage]
})
export class SelectedStorePageModule {}
