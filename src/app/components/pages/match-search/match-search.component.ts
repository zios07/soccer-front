import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { Match } from '../../../models/match';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.css']
})
export class MatchSearchComponent implements OnInit {

  lat: number;
  lng: number;
  mapTypeControl:boolean = true;
  matches: Match[] = [];

  @ViewChild('search') public searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, 
              private ngZone: NgZone,
              private locationService: LocationService) {}

  ngOnInit() {
    this.initMap();
    this.setMarker();
  }

  initMap() {
    this.mapsAPILoader.load().then(
      () => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined || place.geometry === null ){
            return;
          }
        });
      });
    });
  }

  setMarker() {
    let location = this.locationService.getPlayerLocation();
    if(location) {
      this.lat = location.latitude;
      this.lng = location.longiture;
    }
  }

  changeLocation(event) {
    if(event) {
      let location = new Location(event.coords.lng, event.coords.lat);
      this.locationService.setPlayerLocation(location);
      this.setMarker();
    } else {
      if(this.searchElement.nativeElement.value) {
        let geoCode = this.locationService.geoCodeAddress(this.searchElement.nativeElement.value);
        this.setMarker();
      }
    }
  }

}
