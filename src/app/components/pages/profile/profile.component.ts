import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { ToastrService } from 'ngx-toastr';
import { CityService } from '../../../services/city.service';
import { Address } from '../../../models/address';
import { Match } from '../../../models/match';
import { MatchService } from '../../../services/match.service';
import { ParticipationService } from '../../../services/participation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  player: Player = new Player();
  positions: any[] = ["Goal Keeper" ,"Defender", "Attacker"];
  joinedMatches: Match[] = [];
  selectedCity: number;
  selectedPosition: string;

  constructor(private authService: AuthenticationService,
              private participationService: ParticipationService,
              private playerService: PlayerService,
              private matchService: MatchService,
              private toastr: ToastrService,
              private cityService: CityService) {
  }

  ngOnInit() {
    this.player = this.authService.getAuthenticatedPlayer();
    if(!this.player.address)    
      this.player.address = new Address();
    this.loadJoinedMatches();
    this.setSelectedValues();
  }

  loadJoinedMatches() {
    this.matchService.getPlayerMatches(this.player.id).subscribe(resp => {
      this.joinedMatches = resp;
    })
  }

  setSelectedValues() {
    this.selectedPosition = this.player.preferredPosition ? this.player.preferredPosition : '';
  }

  updatePlayer() {
    this.playerService.update(this.player).subscribe(resp => {
      this.toastr.info("Profile updated successfully");
    });
  }

  onPositionChange(position) {
    this.player.preferredPosition = position;
  }

  updateProfile() {
    this.playerService.update(this.player).subscribe(resp => {
      localStorage.setItem('connectedPlayer', JSON.stringify(resp.body));
      this.toastr.success('Profile updated !');
    })
  }

  quitMatch(match) {
    this.participationService.quiteMatch(match, this.player).toPromise().then(resp => {
      // localStorage.setItem('connectedPlayer', JSON.stringify(resp.body));
      this.toastr.info('You are no longer member of this match');
      this.loadJoinedMatches();
    }, error => {
      this.toastr.error('Error while quitting the match');
    })
  }

}
