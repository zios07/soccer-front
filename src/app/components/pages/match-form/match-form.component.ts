import { Component, OnInit } from '@angular/core';
import { Match } from '../../../models/match';
import { Pitch } from '../../../models/pitch';
import { Address } from '../../../models/address';
import { PitchService } from '../../../services/pitch.service';
import { MatchService } from '../../../services/match.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { ParticipationService } from '../../../services/participation.service';

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
  reservedPlaces: number = 0;
  
  constructor(private pitchService: PitchService,
              private matchService: MatchService,
              private participationService: ParticipationService,
              private authService: AuthenticationService,
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
    this.match.availablePlaces = this.match.playersCount - this.reservedPlaces;
    if(this.match.availablePlaces > this.match.playersCount)
      this.match.availablePlaces = 0;
    this.matchService.create(this.match).toPromise().then(resp => {
      this.toastr.info("Match added successfully");
      let player = this.authService.getAuthenticatedPlayer();
      this.participationService.participate(resp.body, player).subscribe(resp2 => {
        this.router.navigate(['/match']);
      }, error => {
        this.toastr.error("Error while joining the match");
      })
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
