import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url: string = environment.API_URL + "cities/";

  constructor(private entityService: EntityService) { }

  getAll() {
    return this.entityService.get(this.url);
  }

}
