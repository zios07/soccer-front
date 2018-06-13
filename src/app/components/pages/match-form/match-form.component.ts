import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Match } from '../../../models/match';
import { Pitch } from '../../../models/pitch';
import { Address } from '../../../models/address';
import { PitchService } from '../../../services/pitch.service';
import { MatchService } from '../../../services/match.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { ParticipationService } from '../../../services/participation.service';
import { MapsAPILoader } from '@agm/core';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

  match: Match = new Match();
  pitches: Pitch[] = [];
  errorMessage: string;
  error: boolean = false;
  playersCountOptions = [{'value': 10}, {'value': 14}, {'value': 22}];
  reservedPlaces: number = 0;
  address;

  constructor(private pitchService: PitchService,
              private authService: AuthenticationService,
              private participationService: ParticipationService,
              private locationService: LocationService,
              private matchService: MatchService,
              private router: Router,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader, 
              private ngZone: NgZone) { 
    this.match.address = new Address();
    this.match.playersCount = 10;
  }

  ngOnInit() {
    this.setupAddressAutocomplete();
    this.pitchService.getAll().subscribe(resp => {
      this.pitches = resp;
    })
  }

  setupAddressAutocomplete() {
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

  onPlayersCountChange(count) {
    this.match.playersCount = count;
  }

  create() {
    let geoCoder = new google.maps.Geocoder();
    this.match.address.value = this.searchElement.nativeElement.value;
    geoCoder.geocode({address: this.match.address.value}, (results, status) => {
      this.match.address.lat = results[0].geometry.location.lat();
      this.match.address.lng = results[0].geometry.location.lng();
      this.match.availablePlaces = this.match.playersCount - this.reservedPlaces;
      if(this.match.availablePlaces > this.match.playersCount)
        this.match.availablePlaces = 0;
      this.matchService.create(this.match).toPromise().then(resp => {
        this.toastr.info("Match added successfully");
        this.router.navigate(['/match']);
        let player = this.authService.getAuthenticatedPlayer();
        this.participationService.participate(resp.body, player).subscribe(resp2 => {
        }, error => {
          this.toastr.error("Error while joining the match");
        })
      }, error => {
        this.toastr.error(String(error));
      })
    });
    
  }

  onPitchChange(id) {
    this.pitches.forEach(pitch => {
      if(pitch.id == id)
        this.match.pitch =  pitch;
    });
  }

}
