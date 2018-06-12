import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EntityService } from './entity.service';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  

  url: string = environment.API_URL + "participations";

  constructor(private entityService: EntityService) { }

  participate(match: Match, player: Player) {
    return this.entityService.post(this.url + "/" + player.id, match);
  }

  getPlayerParticipations(playerId: number) {
    return this.entityService.get(this.url + "/player/" + playerId);
  }

  quiteMatch(match: Match, player: Player) {
    return this.entityService.delete(this.url + "/player/" + player.id + "/match/" + match.id);
  }

}
