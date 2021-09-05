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

  mapMarker: any = {};
  app: any;
  db: any;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: new google.maps.LatLng(27.7097727, 85.3199633),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.onSnapshotInit();
  }

  onSnapshotInit(): void {
    var q = query(collection(this.db, "acw"));
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
      content: data.DriverName
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
