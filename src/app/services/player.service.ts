import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EntityService } from './entity.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url: string = environment.API_URL + "players";

  constructor(private entityService: EntityService) { }

  getAll() {
    return this.entityService.get(this.url);
  }

  update(player) {
    return this.entityService.put(this.url, player);
  }

}
