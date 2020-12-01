import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'popup',
    pathMatch: 'full',
    loadChildren: () => import('./modules/popup/popup.module').then(m => m.PopupModule)
  },
  {
    path: 'tab',
    pathMatch: 'full',
    loadChildren: () => import('./modules/tab/tab.module').then(m => m.TabModule)
  },
  {
    path: 'options',
    pathMatch: 'full',
    loadChildren: () => import('./modules/options/options.module').then(m => m.OptionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
