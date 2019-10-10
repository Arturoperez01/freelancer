import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Servicio } from '../_models/servicio/servicio';
import { GLOBAL as config } from '../_config/config';
//import { config } from 'rxjs';

@Injectable()
export class ServicioService {
    constructor(private http: HttpClient) { 
                }

    contextUrl: string = config.url+'servicio';

    getAll(): Observable<Servicio[]> {
        return this.http.get<Servicio[]>(`${this.contextUrl}`)
        .pipe(map(data => data));
    }

    getById(id: string): Observable<Servicio> {
        return this.http
        .get<Servicio>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }

    register(servicio: Servicio): Observable<Servicio> {
        return this.http.post<Servicio>(`${this.contextUrl}/`, servicio)
        .pipe(map(data => data));;
    }

    update(servicio: Servicio) {
        return this.http.put(`${this.contextUrl}/` + servicio._id, servicio)
        .pipe(map(data => data));
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }
}