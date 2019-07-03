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
import { EventoService } from '../../services/evento.service';
// Import Models
import { Evento } from '../../domain/newtest_db/evento';

// START - USED SERVICES
/**
* eventoService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id evento
*
* eventoService.list
*	@description CRUD ACTION list
*	@returns ARRAY OF evento
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Evento
 * @class EventoListComponent
 */
@Component({
    selector: 'app-evento-list',
    templateUrl: './evento-list.component.html',
    styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {
    list: Evento[];
    search: any = {};
    idSelected: string;
    constructor(
        private eventoService: EventoService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.eventoService.list().subscribe(list => this.list = list);
    }

    /**
     * Select Evento to remove
     *
     * @param {string} id Id of the Evento to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Evento
     */
    deleteItem() {
        this.eventoService.remove(this.idSelected).subscribe(data => this.list = this.list.filter(el => el._id !== this.idSelected));
    }

}
