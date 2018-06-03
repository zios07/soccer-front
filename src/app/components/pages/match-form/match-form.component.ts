import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match';
import { City } from '../../../models/city';
import { Pitch } from '../../../models/pitch';
import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  match: Match = new Match();
  cities: City[] = [];
  pitches: Pitch[] = [];

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.cityService.getAll().subscribe(resp => {
      this.cities = resp;
    })
  }

}
