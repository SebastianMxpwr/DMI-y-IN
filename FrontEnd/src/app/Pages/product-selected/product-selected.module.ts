import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSelectedPageRoutingModule } from './product-selected-routing.module';

import { ProductSelectedPage } from './product-selected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSelectedPageRoutingModule
  ],
  declarations: [ProductSelectedPage]
})
export class ProductSelectedPageModule {}
