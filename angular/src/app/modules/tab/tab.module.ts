import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabComponent } from './pages/tab/tab.component';
import { TabRoutingModule } from './tab-routing.module';

@NgModule({
  declarations: [TabComponent],
  imports: [CommonModule, TabRoutingModule]
})
export class TabModule {}
