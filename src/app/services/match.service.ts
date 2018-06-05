import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EntityService } from './entity.service';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  url: string = environment.API_URL + "matches/";

  constructor(private entityService: EntityService) { }

  getAll() {
    return this.entityService.get(this.url);
  }

  create(match: Match) {
    return this.entityService.post(this.url, match);
  }

  getTodayMatches() {
    return this.entityService.get(this.url + "today");
  }

  getPlayerMatches(id: number) {
    return this.entityService.get(this.url + "player/" + id);
  }

}
