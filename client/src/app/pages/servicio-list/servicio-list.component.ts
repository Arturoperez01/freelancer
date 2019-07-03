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
*       https://beta.skaffolder.com/#!/register?friend=5d122668c0161c5b2b76f322
*
* You will get 10% discount for each one of your friends
* 
*/
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// Import Services
import { ServicioService } from '../../services/servicio.service';
// Import Models
import { Servicio } from '../../domain/newtest_db/servicio';

// START - USED SERVICES
/**
* servicioService.create
*	@description CRUD ACTION create
*	@param servicio obj Object to insert
*
* servicioService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id servicio
*
* servicioService.list
*	@description CRUD ACTION list
*	@returns ARRAY OF servicio
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Servicio
 * @class ServicioListComponent
 */
@Component({
    selector: 'app-servicio-list',
    templateUrl: './servicio-list.component.html',
    styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit {
    list: Servicio[];
    search: any = {};
    idSelected: string;
    constructor(
        private servicioService: ServicioService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.servicioService.list().subscribe(list => this.list = list);
    }

    /**
     * Select Servicio to remove
     *
     * @param {string} id Id of the Servicio to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Servicio
     */
    deleteItem() {
        this.servicioService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
