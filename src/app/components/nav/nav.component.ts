import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  homeLink: string;

  constructor(private authService: AuthenticationService,
              private locationService: LocationService,
              private router: Router) { }

  ngOnInit() {
    this.homeLink = localStorage.getItem('connectedPlayer') ? '/match' : '';
    this.trackMe();
  }

  logout() {
    localStorage.removeItem('connectedPlayer');
    this.router.navigate(['/']);
  }

  trackMe() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        let location = new Location(position.coords.longitude, position.coords.latitude);
        this.locationService.setPlayerLocation(location);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
