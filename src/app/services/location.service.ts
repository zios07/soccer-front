import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '../models/location';
import { HttpClient } from '@angular/common/http';
import { EntityService } from './entity.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private cookieService: CookieService,
              private entityService: EntityService) { }

  setPlayerLocation(location: Location) {
    this.cookieService.set('location', JSON.stringify(location));
  }

  getPlayerLocation() {
    let stringLocation = this.cookieService.get('location');
    if(stringLocation) {
      let location: Location = JSON.parse(stringLocation);
      return location;
    }
  }

  deletePlayerLocation() {
    this.cookieService.delete('location');
  }

  geoCodeAddress(address: string) {
    let geoCoder = new google.maps.Geocoder();
    geoCoder.geocode({ 'address': address }, (results, status) => {
      if(results && results.length > 0 ){ 
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        let location = new Location(lat, lng);
        this.setPlayerLocation(location);
      }
    });
  
  }
}
