import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Roles } from '../_models/roles/roles';
import { GLOBAL as config } from '../_config/config';
//import { config } from 'rxjs';

@Injectable()
export class RolesService {
    constructor(private http: HttpClient) { 
                }

    contextUrl: string = config.url+'roles';

    getAll(): Observable<Roles[]> {
        return this.http.get<Roles[]>(`${this.contextUrl}`)
        .pipe(map(data => data));
    }

    getById(id: string): Observable<Roles> {
        return this.http
        .get<Roles>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }

    register(roles: Roles): Observable<Roles> {
        return this.http.post<Roles>(`${this.contextUrl}/`, roles)
        .pipe(map(data => data));;
    }

    update(roles: Roles) {
        return this.http.put(`${this.contextUrl}/` + roles._id, roles)
        .pipe(map(data => data));
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }
}