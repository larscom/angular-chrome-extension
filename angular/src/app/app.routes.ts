import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'popup',
    loadChildren: () => import('./modules/popup/popup.routes').then((c) => c.routes)
  },
  {
    path: 'tab',
    loadChildren: () => import('./modules/tab/tab.routes').then((c) => c.routes)
  },
  {
    path: 'options',
    loadChildren: () => import('./modules/options/options.routes').then((c) => c.routes)
  },
  {
    path: 'side-panel',
    loadChildren: () => import('./modules/side-panel/side-panel.routes').then((c) => c.routes)
  }
]
