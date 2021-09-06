import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpstrackerComponent } from './components/gpstracker/gpstracker.component';
import { RealtimetrackerComponent } from './components/realtimetracker/realtimetracker.component';

const routes: Routes = [
  { path: '', redirectTo: 'realtime', pathMatch:'full' },
  { path: 'gps', component: GpstrackerComponent },
  { path: 'realtime', component: RealtimetrackerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
