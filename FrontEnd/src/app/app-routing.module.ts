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
    path: 'selected-store/:idStore',
    loadChildren: () => import('./Pages/selected-store/selected-store.module').then( m => m.SelectedStorePageModule)
  },
  {
    path: 'product-selected/:idStore/:idProduct',
    loadChildren: () => import('./Pages/product-selected/product-selected.module').then( m => m.ProductSelectedPageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./Pages/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
