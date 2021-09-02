import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GpstrackerService } from '../../services/gpstracker.service';
import { GPSLocation } from '../../model/location.model';
import { } from 'googlemaps';

@Component({
  selector: 'app-gpstracker',
  templateUrl: './gpstracker.component.html',
  styleUrls: ['./gpstracker.component.css']
})
export class GpstrackerComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map | undefined;

  mapMarker: any = {};

  constructor(private service: GpstrackerService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: new google.maps.LatLng(27.70453, 85.3292283),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.getLocation();
  }

  getLocation(): void {
    
    this.service.getLocationData().subscribe(
      data => {
        this.updateMarker(data)
      },
      error => {
        console.log(error);
      }
    )
  }

  updateMarker(data: GPSLocation[]): void {
    for (let i = 0; i < data.length; i++) {
      if (this.mapMarker.hasOwnProperty(data[i].IMEI)) {
        this.mapMarker[data[i].IMEI].setPosition(new google.maps.LatLng(data[i].Latitude, data[i].Longitude));
      } else {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
          title: data[i].DriverName,
          map: this.map
        });
        this.addMarkerInfo(marker,data[i]);
        this.mapMarker[data[i].IMEI] = marker;
      }
    }
    setTimeout(() => { this.getLocation(); }, 10000);
  }
  
  addMarkerInfo(marker: google.maps.Marker, data: GPSLocation): void {

    var infoWindow = new google.maps.InfoWindow({
      content: data.DriverName + " (" + data.VehicleNo + ")"
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
