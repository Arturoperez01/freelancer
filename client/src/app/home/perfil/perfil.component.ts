
import { Component, OnInit, ElementRef }        from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { SHA3 } from 'sha3';

import { User } from '../../_models/user';

import { SecurityService } from 'src/app/_auth/services/security.service';
import { store } from '../../_auth/current-user';
import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services';
import { EventoService } from 'src/app/_services/evento.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_auth';
//import { RolesConfig } from '../../_models/roles/roles-config'

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.component.html'
  //,styleUrls: ['./eventos.component.scss']
})
export class PerfilComponent {

    user: User;
    passwordOld: string;
    passwordNew: string;
    passwordNewConfirm: string;
    showError: boolean;
    @ViewChild('closeModal') closeModal: ElementRef;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private securityService: SecurityService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.authenticationService.getUser().subscribe(user => {
                                                                    this.user = user;
                                                                    console.log(this.user);
                                                                });
                    }

    /**
     * Save User
     *
     * @param {boolean} valid Form validity
     */
    save(valid: boolean) {
        if (valid)
            this.userService.update(this.user).subscribe(data => {
                this.userService.getById(this.user._id).subscribe(user => {
                    store.setUser(user);
                    this.router.navigateByUrl('/home');
                });
            });
    }

    /**
     * Change password of user
     */
    changePassword() {
        this.showError = false;

        // Convert passwords in SHA-3
        const hashNewPwd = new SHA3(512);
        hashNewPwd.update(this.passwordNew);
        const passwordNew = hashNewPwd.digest('hex');

        const hash = new SHA3(512);
        hash.update(this.passwordOld);
        const passwordOld = hash.digest('hex');

        // Change password
        this.securityService.changePassword(passwordNew, passwordOld).subscribe(data => {
            this.passwordOld = null;
            this.passwordNew = '';
            this.passwordNewConfirm = '';
            this.showError = false;
            this.closeModal.nativeElement.click();
        }, err => {
            this.showError = true;
        });
    }
}