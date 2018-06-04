import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/city';
import { CityService } from '../../../services/city.service';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  player: Player = new Player();
  positions: any[] = ["Goal Keeper" ,"Defender", "Attacker"];
  cities: City[] = [];

  constructor(private authService: AuthenticationService,
              private playerService: PlayerService,
              private toastr: ToastrService,
              private cityService: CityService) { 
  }

  ngOnInit() {
    this.player = this.authService.getAuthenticatedPlayer();
    if(!this.player.address)
      this.player.address = new Address();
    this.cityService.getAll().subscribe(resp => {
      this.cities = resp;
    })

  }

  updatePlayer() {
    this.playerService.update(this.player).subscribe(resp => {
      this.toastr.info("Profile updated successfully");
    });
  }

}
