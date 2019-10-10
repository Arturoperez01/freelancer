import { Time } from '@angular/common';

export class DetallesBase {

    constructor() { }

    public _id: string;
    public fecha?: Date;
    public horaIni?: Time;
    public horaFin?: Time;
    public cupo?: number;
}