import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
//import {  } from "";
// import {google} from 'googlemaps';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
// declare const google: any;

declare const google: any;
@Component({
  selector: 'app-store-location',
  standalone: false,
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit {

  // constructor() { }

  origin: any;
  destination: any;
  location: any;
  @ViewChild('longestRouteMap') elemLongestRouteMap: any;
  lat: number = 17.4501615;
  lng: number = 78.3671454;
  myLatlng: any;
  makers: any = {};

  data: any;
  marker: any;
  input_id: string;
  distance: string;
  json: any = [];
  map: any;
  latt: any;
  btnShow: Boolean;
  autocompleteItems: any = [];
  searchPalce: any;
  destinationLat: any;
  destinationlng: any;
  showResendbtn: any = false;

  // infowindow: any;

  constructor(public globalService: GlobalServiceService, private zone: NgZone, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.elemLongestRouteMap.nativeElement, mapOptions)
  }

  getNearbyStores(lat, lng) {
    this.spinner.show();
    ///clear map after routing
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.elemLongestRouteMap.nativeElement, mapOptions);
    ///
    this.input_id = "4.5";
    this.distance = "30"
    this.globalService.getDatawithQueryParams3(this.input_id, lat, lng, this.distance).subscribe((data) => {
      this.spinner.hide();
      this.json = data;
      if (this.json.length > 0) {
        this.createMarker(this.json);
      } else {
        alert('No Records Found');
      }
    },
   error => {         this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    });
  };

  createMarker(place) {
    let Latlngbounds = new google.maps.LatLngBounds();
    place.forEach(data => {
      this.myLatlng = new google.maps.LatLng(data.latitude, data.longtitude);
      this.marker = new google.maps.Marker({
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: this.myLatlng,
        map: this.map
      });
      let infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(this.marker, 'click', (evt) => {
        this.destinationLat = data.latitude;
        this.destinationlng = data.longtitude;
        this.DisplayRoute(this.destinationLat, this.destinationlng, this.elemLongestRouteMap.nativeElement);
      });

      google.maps.event.addListener(this.marker, 'mouseover', function () {
        infowindow.setContent(data.companyname);
        infowindow.open(this.map, this);
      });

      google.maps.event.addListener(this.marker, 'mouseout', function () { infowindow.close(); });

      Latlngbounds.extend(this.marker.position);

    });
    this.map.setCenter(Latlngbounds.getCenter());
    this.map.fitBounds(Latlngbounds);
    
  };


  currentLocation() {
    this.searchPalce = "";
    this.autocompleteItems = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getNearbyStores(this.lat, this.lng);

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getPlace(value) {
    this.autocompleteItems = [];
    if (value != '' && value != undefined) {
      let autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions({ input: value },
        (predictions, status) => {
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        });
    }
  };

  getSelectPlaceLatLng(val) {
    this.searchPalce = val.description;
    this.autocompleteItems = [];
    var _this = this;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'placeId': val.place_id }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        _this.lat = results[0].geometry.location.lat();
        _this.lng = results[0].geometry.location.lng();
        _this.getNearbyStores(_this.lat, _this.lng);
      };

    });

  };



  DisplayRoute(destinationLat, destinationlng, MapDivID: any) {
    let map:any;
    map = new google.maps.Map(MapDivID, {
      zoom: 14
    });
    var directionsDisplay: any = new google.maps.DirectionsRenderer({
      draggable: false,
      map: map
    });

    var directionsService: any = new google.maps.DirectionsService;

    directionsDisplay.setMap(map);
    directionsService.route({
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: destinationLat, lng: destinationlng },
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
        var myroute: any = directionsDisplay.directions.routes[0];
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }

}

