import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Eventos } from '../_models/eventos/eventos';
import { Turno } from '../_models/eventos/turno'
import { GLOBAL as config } from '../_config/config';
//import { config } from 'rxjs';

@Injectable()
export class EventoService {
    constructor(private http: HttpClient) { 
                }
                
    contextUrl: string = config.url+'eventos';

    getAll(): Observable<Eventos[]> {
        return this.http.get<Eventos[]>(`${this.contextUrl}`)
        .pipe(map(data => data));
    }
    /**
     * Regresa todos los turnos relacionados con el evento
     * 
     * @param id Es el id del evento
     */
    getTurnos(id: string): Observable<Turno[]> {
        return this.http
        .get<Turno[]>(`${this.contextUrl}/turnos/` + id)
        .pipe(map(data => data));
    }

    getUserEvent(id: string): Observable<Eventos> {
        return this.http
        .post<Eventos>(`${this.contextUrl}/me`, {id: id})
        .pipe(map(data => data));
    }

    getById(id: string): Observable<Eventos> {
        return this.http
        .get<Eventos>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }

    register(eventos: Eventos): Observable<Eventos> {
        return this.http.post<Eventos>(`${this.contextUrl}/`, eventos)
        .pipe(map(data => data));;
    }

    update(eventos: Eventos) {
        return this.http.post(`${this.contextUrl}/` + eventos._id, eventos)
        .pipe(map(data => data));
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }
}