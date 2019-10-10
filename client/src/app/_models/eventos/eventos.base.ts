import { Turno } from './turno';

export class EventosBase {

    constructor() { }

    public _id: string;
    public titulo?: string;
    public servicio?: string;
    public perfiles?: string[];
    public Turnos?: Turno[];
}