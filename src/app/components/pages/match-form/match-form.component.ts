import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match';
import { Pitch } from '../../../models/pitch';
import { CityService } from '../../../services/city.service';
import { Address } from '../../../models/address';
import { PitchService } from '../../../services/pitch.service';
import { MatchService } from '../../../services/match.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from '../../../models/team';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  match: Match = new Match();
  pitches: Pitch[] = [];
  errorMessage: string;
  error: boolean = false;
  playersCountOptions = [{'value': 10}, {'value': 14}, {'value': 22}];

  constructor(private cityService: CityService,
              private pitchService: PitchService,
              private matchService: MatchService,
              private playerService: PlayerService,
              private router: Router,
              private toastr: ToastrService) { 
    this.match.address = new Address();
    this.match.playersCount = 10;
  }

  ngOnInit() {
    this.pitchService.getAll().subscribe(resp => {
      this.pitches = resp;
    })
  }

  onPlayersCountChange(count) {
    this.match.playersCount = count;
  }

  create() {
    this.matchService.create(this.match).toPromise().then(resp => {
      this.toastr.info("Match added successfully");
      let match = resp.body;
        this.router.navigate(['/match']);
    }, error => {
      this.toastr.error(String(error));
    })
  }

  onPitchChange(id) {
    this.pitches.forEach(pitch => {
      if(pitch.id == id)
        this.match.pitch =  pitch;
    });
  }

}
