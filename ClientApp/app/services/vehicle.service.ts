import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveVehicle } from '../models/vehicle';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class VehicleService {

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getMakes(){
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getFeatures(){
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  getVehicles(filter){
    console.log('the filter:: '+JSON.stringify(filter));
    return this.http.get('/api/vehicles?'+this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj){
    var parts = [];
    console.log('toQueryString');
    for (var prop in obj){
      var value = obj[prop];
      // console.log(prop);
      // console.log(value);
      if(value != null && value != undefined){
        parts.push(encodeURIComponent(prop) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }

  getVehicle(id){
    return this.http.get('/api/vehicles/'+id).map(res => res.json());
  }
  
  create(vehicle){
    return this.authHttp.post('/api/vehicles', vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle){
    return this.authHttp.put('/api/vehicles/'+vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id){
    return this.authHttp.delete('/api/vehicles/'+id)
      .map(res => res.json());    
  }
}
