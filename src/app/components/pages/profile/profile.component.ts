import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/city';
import { CityService } from '../../../services/city.service';
import { Address } from '../../../models/address';
import { Match } from '../../../models/match';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  player: Player = new Player();
  positions: any[] = ["Goal Keeper" ,"Defender", "Attacker"];
  cities: City[] = [];
  joinedMatches: Match[] = [];
  selectedCity: number;
  selectedPosition: string;

  constructor(private authService: AuthenticationService,
              private playerService: PlayerService,
              private matchService: MatchService,
              private toastr: ToastrService,
              private cityService: CityService) {
  }

  ngOnInit() {
    this.player = this.authService.getAuthenticatedPlayer();
    if(!this.player.address)    
      this.player.address = new Address();
    this.loadCities();
    this.loadJoinedMatches();
    this.setSelectedValues();
  }

  loadCities() {
    this.cityService.getAll().subscribe(resp => {
      this.cities = resp;
    })
  }

  loadJoinedMatches() {
    this.matchService.getPlayerMatches(this.player.id).subscribe(resp => {
      this.joinedMatches = resp;
    })
  }

  setSelectedValues() {
    this.selectedCity = this.player.address.city.id ? this.player.address.city.id : 0;
    this.selectedPosition = this.player.preferredPosition ? this.player.preferredPosition : '';
  }

  updatePlayer() {
    this.playerService.update(this.player).subscribe(resp => {
      this.toastr.info("Profile updated successfully");
    });
  }

  onCityChange(id) {
    this.cities.forEach(city => {
      if(city.id == id)
        this.player.address.city = city;
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
    this.playerService.quiteMatch(match, this.player).toPromise().then(resp => {
      localStorage.setItem('connectedPlayer', JSON.stringify(resp.body));
      this.toastr.info('You are no longer member of this match');
      this.loadJoinedMatches();
    }, error => {
      this.toastr.error('Error while quitting the match');
    })
  }

}
