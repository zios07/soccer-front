import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match';
import { City } from '../../../models/city';
import { Pitch } from '../../../models/pitch';
import { CityService } from '../../../services/city.service';
import { Address } from '../../../models/address';
import { PitchService } from '../../../services/pitch.service';
import { MatchService } from '../../../services/match.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  match: Match = new Match();
  cities: City[] = [];
  pitches: Pitch[] = [];
  errorMessage: string;
  error: boolean = false;

  constructor(private cityService: CityService,
              private pitchService: PitchService,
              private matchService: MatchService,
              private router: Router,
              private toastr: ToastrService) { 
    this.match.address = new Address();
    this.match.host = new Team();
    this.match.guest = new Team();
  }

  ngOnInit() {
    this.cityService.getAll().subscribe(resp => {
      this.cities = resp;
    })
    this.pitchService.getAll().subscribe(resp => {
      this.pitches = resp;
    })
  }

  create() {
    console.log(Object.keys(this.match));
    Object.keys(this.match).forEach(element => {
      console.log(this.match[element]);
      if(!this.match[element] || this.match[element ] === null) {
      console.log(element);
        console.log(this.match[element]);
        this.error = true;
        this.errorMessage = "Please fill all the inputs";
        return;
      }
    });
    // this.matchService.create(this.match).subscribe(resp => {
    //   this.router.navigate(['/match']);
    //   this.toastr.info("Match added successfully");
    // }, error => {
    //   this.toastr.error(String(error));
    // })
  }

  onCityChange(id) {
    this.match.address.city = this.cities.find(city => {
      return city.id === id
    });
  }

  onPitchChange(id) {
    this.match.pitch = this.pitches.find(pitch => {
      return pitch.id === id
    });
  }

}
