import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GPSLocation } from '../model/location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpstrackerService {

  constructor(private httpClient: HttpClient) { }

  getLocationData():Observable<GPSLocation[]>{
    return this.httpClient.get<GPSLocation[]>("http://schedular.upcodenepal.com/LocationByClientCode?clientCode=test");
  }
}
