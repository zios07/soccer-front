import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../../../models/player';
import { AuthenticationService } from '../../../services/authentication.service';
import { Address } from '../../../models/address';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDto } from '../../../dto/userDto';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  dialog: NgbModalRef | null;
  player: Player = new Player();
  positions: any[] = ["Goal Keeper" ,"Defender", "Attacker"];
  confirmPwd: String;
  cities: City[] = [];
  user: UserDto = new UserDto();

  constructor(private modalService: NgbModal,
              private authService: AuthenticationService,
              private cityService: CityService,
              private toastr: ToastrService,
              private router: Router) {
    this.player.address = new Address();
  }

  ngOnInit() {
  }

  signup() {
    if(this.player.password === this.confirmPwd)
    this.authService.register(this.player).subscribe(resp => {
      localStorage.setItem('connectedPlayer', JSON.stringify(resp));
      this.dialog.close();
      this.router.navigate(['profile']);
      this.toastr.info("Registration success");
    })
  }

  login() {
    this.authService.login(this.user).subscribe(resp => {
      localStorage.setItem('connectedPlayer', JSON.stringify(resp));
      this.dialog.close();
      this.router.navigate(['match']);
      // this.toastr.success("Logged in successfully");
    }, error => {
      this.toastr.error(String(error));
    })
  }

  open(content, type) {
    if(type === 'signup')
      this.cityService.getAll().subscribe(resp => {
        this.cities = resp;
      })
    let size:"sm" | "lg" = type === 'signup' ? 'lg': 'sm';
    this.dialog = this.modalService.open(content, {backdropClass: 'light-blue-backdrop', centered: true, size: size});
  }
  
  onCityChange(id) {
    this.player.address.city = this.cities.find(city => {
      return city.id === id
    });
  }

}
