import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GpstrackerComponent } from './components/gpstracker/gpstracker.component';
import { RealtimetrackerComponent } from './components/realtimetracker/realtimetracker.component';

@NgModule({
  declarations: [
    AppComponent,
    GpstrackerComponent,
    RealtimetrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
