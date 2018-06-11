import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private cookieService: CookieService) { }

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

}
