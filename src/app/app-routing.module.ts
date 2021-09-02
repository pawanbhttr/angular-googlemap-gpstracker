import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpstrackerComponent } from './components/gpstracker/gpstracker.component';

const routes: Routes = [
  { path: '', redirectTo: 'gps', pathMatch:'full' },
  { path: 'gps', component: GpstrackerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
