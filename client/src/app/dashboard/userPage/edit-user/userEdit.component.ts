import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from '../../../_models/user/user';
import { UserService } from '../../../_services/user.service';
import { AuthenticationService } from '../../../_auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SHA3 } from 'sha3';
import { ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UserFormService } from '../UserForm.service';

declare var jQuery: any;
/**
 * Edit user by Admin
 */
@Component({
    selector: 'app-user-edit',
    templateUrl: './userEdit.component.html',
})
export class UserEditComponent implements OnInit {

    user: User;
    passwordNew: string;
    passwordNewConfirm: string;
    passwordAdmin: string;
    showError: boolean;
    servicios;
    roles;

    @ViewChild('closeModal') closeModal: ElementRef;

    constructor(
        private fb: FormBuilder,
        private userFormService: UserFormService,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) { 
        this.userFormService.getServicios().subscribe(response=>{
                                                                    this.servicios=response;
                                                                }
                                                    );
        this.userFormService.getRoles().subscribe(response=>{
                                                                this.roles=response;
                                                            }
                                                    );    
        
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {

            if (params.id === 'new') {
                // New User

                this.user = new User(null, null, null, [], [], []);
                
            } else {
                // Get User
                this.userService.getById(params.id).subscribe(user => {
                    this.user = user;
                });
            }
        });
    }

    /**
     * Save or create User
     */
    save(): void {
        if (this.user._id) {
            // Save
            this.userService.update(this.user).subscribe(data => this.router.navigateByUrl('/dashboard/user'));
        } else {
            // Create
            const hash = new SHA3(512);
            hash.update(this.user.password);
            this.user.password = hash.digest('hex');
            this.userService.register(this.user).subscribe(data => this.router.navigateByUrl('/dashboard/user'));
        }
    }

    /**
     * Delete user
     */
    deleteUser(): void {
        this.userService.delete(this.user._id).subscribe(data => this.router.navigateByUrl('/dashboard/user'));
    }


    onAddPerfil(perfil){
        if (perfil.value) {
            this.user.perfiles.push(perfil.value.toUpperCase());
            perfil.value = '';
        }
    };
    
    onPerfilRemove(index){
        this.user.perfiles.splice(index, 1);
    };
      
    changePassword() {
        const hashNewPwd = new SHA3(512);
        hashNewPwd.update(this.passwordNew);
        var passwordNew = hashNewPwd.digest('hex');

        const hash = new SHA3(512);
        hash.update(this.passwordAdmin);
        var passwordAdmin = hash.digest('hex');

        this.userService.changePassword(this.user._id, passwordNew, passwordAdmin).subscribe(data => {
            this.passwordAdmin = null;
            this.passwordNew = null;
            this.passwordNewConfirm = null;
            this.showError = false;
            this.closeModal.nativeElement.click();
        }, err => {
            this.showError = true;
        });
    }

    trackByFn(index: number, item: any) {
        return index;
    }
}
