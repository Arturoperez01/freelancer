export class UserBase {

    constructor() { }

    public _id: string;
    public mail?: string;
    public name?: string;
    public password: string;
    public roles?: string[];
    public servicios?: string[];
    public perfiles?: string[];
    public surname?: string;
    public username: string;

}