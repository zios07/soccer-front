import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.css']
})
export class MatchSearchComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  mapTypeControl:boolean = true;

  @ViewChild('search') public searchElement: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
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

}
