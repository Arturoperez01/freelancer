import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inscripcion } from '../_models/inscripcion/inscripcion';
import { GLOBAL as config } from '../_config/config';
//import { config } from 'rxjs';

@Injectable()
export class InscripcionService {
    constructor(private http: HttpClient) { 
                }

    contextUrl: string = config.url+'inscripcion';

    getAll(): Observable<Inscripcion[]> {
        return this.http.get<Inscripcion[]>(`${this.contextUrl}`)
        .pipe(map(data => data));
    }

    getById(id: string): Observable<Inscripcion> {
        return this.http
        .get<Inscripcion>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }

    getByIdEvento(id: string): Observable<Inscripcion[]> {
        return this.http
        .get<Inscripcion[]>(`${this.contextUrl}/findByid_evento/` + id)
        .pipe(map(data => data));
    }

    getByIdUser(id: string): Observable<Inscripcion[]> {
        return this.http
        .get<Inscripcion[]>(`${this.contextUrl}/user/` + id)
        .pipe(map(data => data));
    }
    
    register(inscripcion: Inscripcion): Observable<Inscripcion> {
        return this.http.post<Inscripcion>(`${this.contextUrl}/`, inscripcion)
        .pipe(map(data => data));
    }

    update(inscripcion: Inscripcion) {
        return this.http.put(`${this.contextUrl}/` + inscripcion._id, inscripcion)
        .pipe(map(data => data));
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }
}