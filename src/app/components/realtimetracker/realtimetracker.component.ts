import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GPSLocation } from '../../model/location.model';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, onSnapshot } from '@firebase/firestore';
import { } from 'googlemaps';


@Component({
  selector: 'app-realtimetracker',
  templateUrl: './realtimetracker.component.html',
  styleUrls: ['./realtimetracker.component.css']
})
export class RealtimetrackerComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map | undefined;
  defaultLocation: any = { lat: 27.7049658, long: 85.33145239999999 };
  mapMarker: any = {};
  
  app: any;
  db: any;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getCurrentLocation().then((pos) => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: new google.maps.LatLng(pos.lat, pos.long),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.onSnapshotInit();
    });
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          resolve({ lat: position.coords.latitude, long: position.coords.longitude })
        }, error => {
          console.log(error.message);
          resolve(this.defaultLocation);
        });
      } else {
        console.log("Browser doesnot support location features.");
        resolve(this.defaultLocation)
      }
    });
  }

  onSnapshotInit(): void {
    var q = query(collection(this.db, environment.clientCode));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((changes) => {
        this.updateMarker({
          IMEI: changes.doc.id,
          VehicleNo: changes.doc.data().VehicleNo,
          DriverName: changes.doc.data().DriverName,
          MobileNo: changes.doc.data().MobileNo,
          Latitude: changes.doc.data().Latitude,
          Longitude: changes.doc.data().Longitude,
          Speed: changes.doc.data().Speed,
          ReceivedDate: new Date()
        });
      })
    });
  }

  updateMarker(data: GPSLocation): void {

      if (this.mapMarker.hasOwnProperty(data.IMEI)) {
        this.mapMarker[data.IMEI].setPosition(new google.maps.LatLng(data.Latitude, data.Longitude));
      } else {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.Latitude, data.Longitude),
          title: data.DriverName,
          map: this.map
        });
        this.addMarkerInfo(marker,data);
        this.mapMarker[data.IMEI] = marker;
      }
  }

  addMarkerInfo(marker: google.maps.Marker, data: GPSLocation): void {

    var infoWindow = new google.maps.InfoWindow({
      content: "<div style='text-align:center;font-weight:bold;'>"+ data.DriverName + "<br/>" + data.VehicleNo + "<br/>" + data.MobileNo + "</div>"
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
