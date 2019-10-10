
//import { DetallesBase } from './detalles.base';
import { User } from '../user/user';
import { Turno } from '../eventos/turno';
import { Time } from '@angular/common';

export class Inscripcion {


    public _id: string;
    public idUser?: string;
    public idTurno?: string;
    public idEvento?: string;
    //public user?: User;
    //public turno?: Turno;
    public avaya?: number;
    public tiempoAsistencia?: number;    

    constructor(
        _id?: string,
        idUser?: string,
        idTurno?: string,
        idEvento?: string,
        avaya?: number,
        tiempoAsistencia?: number
        ) 
    {
        this._id = _id;
        this.idUser = idUser;
        this.idTurno = idTurno;
        this.idEvento = idEvento;
        this.avaya = avaya;
        this.tiempoAsistencia = tiempoAsistencia;
    }

}
