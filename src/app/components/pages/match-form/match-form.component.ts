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

  constructor(private cityService: CityService,
              private pitchService: PitchService,
              private matchService: MatchService,
              private playerService: PlayerService,
              private router: Router,
              private toastr: ToastrService) { 
    this.match.address = new Address();
  }

  ngOnInit() {
    this.pitchService.getAll().subscribe(resp => {
      this.pitches = resp;
    })
  }

  selectPlayersCount(count) {
    console.log("value changed");
    this.match.playersCount = count;
  }

  create() {
    console.log(this.match);
    // this.matchService.create(this.match).toPromise().then(resp => {
    //   this.toastr.info("Match added successfully");
    //   console.log(resp);
    //   let match = resp.body;
    //   let player = localStorage.getItem('connectedPlayer');
    //   this.playerService.joinTeam(JSON.parse(player), match, match.host).toPromise().then(resp => {
    //     localStorage.setItem('connectedPlayer', JSON.stringify(resp.body));
    //     this.router.navigate(['/match']);
    //   });
    // }, error => {
    //   this.toastr.error(String(error));
    // })
  }

  onPitchChange(id) {
    this.pitches.forEach(pitch => {
      if(pitch.id == id)
        this.match.pitch =  pitch;
    });
  }

}
