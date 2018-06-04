import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EntityService } from './entity.service';
import { JoinRequest } from '../dto/join-request';
import { Participation } from '../models/participation';
import { Match } from '../models/match';
import { Team } from '../models/team';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url: string = environment.API_URL + "players/";

  constructor(private entityService: EntityService) { }

  getAll() {
    return this.entityService.get(this.url);
  }

  update(player) {
    return this.entityService.put(this.url, player);
  }

  joinTeam(player: Player, match: Match, team: Team) {
    let participation = new Participation(team, match);
    if(player.participations && player.participations.length >= 1)
      player.participations.push(participation);
    else
      player.participations = new Array<Participation>(participation);
    return this.entityService.put(this.url, player);
  }

}
