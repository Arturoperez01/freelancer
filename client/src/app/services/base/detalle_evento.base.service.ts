/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5d122668c0161c5b2b76f322
*
* You will get 10% discount for each one of your friends
* 
*/
/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  FOR CUSTOMIZE detalle_eventoBaseService PLEASE EDIT ../detalle_evento.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 // DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// CONFIG
import { environment } from '../../../environments/environment';

// MODEL
import { Detalle_evento } from '../../domain/newtest_db/detalle_evento';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../detalle_evento.service.ts
 */

/*
 * SCHEMA DB detalle_evento
 *
	{
		cupo: {
			type: 'Integer'
		},
		hora_final: {
			type: 'Date'
		},
		hora_inicial: {
			type: 'Date'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		id_detalle_asistencia: {
			type: Schema.ObjectId,
			ref : "asistencia"
		},
		id_evento: {
			type: Schema.ObjectId,
			ref : "detalle_evento"
		},
	}
 *
 */
@Injectable()
export class Detalle_eventoBaseService {

    contextUrl: string = environment.endpoint + '/detalle_evento';
    constructor(
        protected http: HttpClient
        ) { }

    // CRUD METHODS

    /**
    * detalle_eventoService.findByid_evento
    *   @description CRUD ACTION findByid_evento
    *   @param Objectid key Id della risorsa id_evento da cercare
    *
    */
    findById_evento(id: string): Observable<Detalle_evento[]> {
        return this.http
            .get<Detalle_evento[]>(this.contextUrl + '/findByid_evento/' + id)
            .pipe(
                map(response => response)
            );
    }

    /**
    * detalle_eventoService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id detalle_evento
    *   @returns detalle_evento
    *
    */
    update(item: Detalle_evento): Observable<Detalle_evento> {
        return this.http
            .post<Detalle_evento>(this.contextUrl + '/' + item._id, item)
            .pipe(map(data => data));
    }


    // Custom APIs


    /**
    * detalle_eventoService.add
    *   @description Agrega un detalle al evento
    *
    */
    add(...params: any[]): Observable<any> {
        return this.http
            .post<any>(this.contextUrl + '/add', {})
            .pipe(
                map(response => response)
            );
    }


    /**
    * detalle_eventoService.list
    *   @description Regresa una lista de detalles relacionados a un evento
    *   @param Number id_evento
    *   @returns String
    *
    */
    list(...params: any[]): Observable<any> {
        return this.http
            .get<any>(this.contextUrl + '/{id_evento}/list', {})
            .pipe(
                map(response => response)
            );
    }

}
