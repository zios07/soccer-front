import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private http: HttpClient) { }

  url: string = environment.API_URL + "auth/";

  register(player) {
    return this.http.post(this.url + "register", player);
  }

  login(credentials) {
    return this.http.post(this.url + "login", credentials);
  }

  getAuthenticatedPlayer() {
    let player;
    let stringPlayer = localStorage.getItem('connectedPlayer');
    if(stringPlayer) {
      player = JSON.parse(stringPlayer);
    }
    return player;
  }
}
