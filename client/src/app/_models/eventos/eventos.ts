
import { EventosBase } from './eventos.base';
import { Turno } from './turno';

export class Eventos {

    public _id: string;
    public titulo?: string;
    public servicio?: string;
    public perfiles?: string[];
    public turnos?: Turno[];
  
    constructor(
        _id?: string,
        titulo?: string,
        servicio?:string,
        perfiles?:string[],
        turnos?:Turno[]
    ) {
        this._id = _id;
        this.titulo = titulo;
        this.servicio = servicio;
        this.perfiles = perfiles;
        this.turnos = turnos;
    }

}
