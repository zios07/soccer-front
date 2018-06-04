import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EntityService } from './entity.service';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  url: string = environment.API_URL + "pitches/";

  constructor(private entityService: EntityService) { }

  getAll() {
    return this.entityService.get(this.url);
  }
}
