import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedStorePage } from './selected-store.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedStorePageRoutingModule {}
