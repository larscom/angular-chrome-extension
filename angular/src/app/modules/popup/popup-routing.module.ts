import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupComponent } from './pages/popup/popup.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupRoutingModule {}
