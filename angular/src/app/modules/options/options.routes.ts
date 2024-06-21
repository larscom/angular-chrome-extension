import { Routes } from '@angular/router'
import { OptionsComponent } from './options.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OptionsComponent
  }
]
