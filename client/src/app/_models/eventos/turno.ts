
import { DetallesBase } from './turno.base';
import { Time } from '@angular/common';
/**
 * Turno 
 *
 *  @param _id       string
 *  @param fecha     Date
 *  @param horaIni   string,
 *  @param horaFin   string,
 *  @param cupo      number
 */
export class Turno {


    public _id: string;
    public fecha?: Date;
    public horaIni?: string;
    public horaFin?: string;
    public cupo?: number;

    constructor(
        _id?: string,
        fecha?: Date,
        horaIni?: string,
        horaFin?: string,
        cupo?: number
    ) {
        this._id = _id;
        this.fecha = fecha;
        this.horaIni = horaIni;
        this.horaFin = horaFin;
        this.cupo = cupo;
    }

}
