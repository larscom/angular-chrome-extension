import { Routes } from '@angular/router'
import { SidePanelComponent } from './side-panel.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SidePanelComponent
  }
]
