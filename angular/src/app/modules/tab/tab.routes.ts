import { Routes } from '@angular/router'
import { TabComponent } from './tab.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TabComponent
  }
]
