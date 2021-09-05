import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GPSLocation } from '../model/location.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GpstrackerService {

  constructor(private httpClient: HttpClient) { }

  getLocationData(): Observable<GPSLocation[]> {
    return this.httpClient.get<GPSLocation[]>(environment.apiUrl + "/LocationByClientCode?clientCode=cns");
  }
}
