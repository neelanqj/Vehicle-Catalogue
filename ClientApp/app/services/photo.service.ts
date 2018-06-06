import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PhotoService {

    constructor(private http: Http) { }

    upload(vehicleId, file){
        var formData = new FormData();
        formData.append('file',file);
        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
            .map(res=>res.json());
    }
    getPhotos(vehicleId) {
        return this.http.get(`/api/vehicles/${vehicleId}/photos`)
        .map(res => res.json());
    }
}