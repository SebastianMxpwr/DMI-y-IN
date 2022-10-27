import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'stores',
    loadChildren: () => import('./Pages/stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'selected-store/:id',
    loadChildren: () => import('./Pages/selected-store/selected-store.module').then( m => m.SelectedStorePageModule)
  },
  {
    path: 'product-selected',
    loadChildren: () => import('./Pages/product-selected/product-selected.module').then( m => m.ProductSelectedPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
