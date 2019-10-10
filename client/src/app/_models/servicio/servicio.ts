
import { ServicioBase } from './servicio.base';

export class Servicio extends ServicioBase {



    constructor(
        _id?: string,
        name?: string
    ) {
        super();
        this._id = _id;
        this.name = name;
    }

}
