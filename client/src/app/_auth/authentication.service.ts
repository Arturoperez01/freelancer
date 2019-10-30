
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { store } from './current-user';
import { SecurityService } from './services/security.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GLOBAL as config } from '../_config/config';
import { environment } from '../../environments/environment'
import { shareReplay, map, tap } from 'rxjs/operators';

/**
 * This service manage the Authentication
 */
@Injectable({
    providedIn: 'root',
  })
export class AuthenticationService {
    isLoggedIn = false;
    contextUrl: string = environment.endpoint;//+'user';

    constructor(
        //private securityService: SecurityService,
        private router: Router,
        private http: HttpClient
    ) { }

    /**
     * Get the logged user
     */
    public getUser(): Observable<User> {
        return new Observable<User>((ob: any) => {

            // Get JWT token from browser storage
            let token = sessionStorage.getItem('token') || localStorage.getItem('token');

            // Get user from store
            store.currentUser$.subscribe(user => {
                if (token && user) {
                    // User logged and stored token
                    //this.isLoggedIn = true; 
                    //console.log(this.isLoggedIn);this.isLoggedIn = true;console.log(this.isLoggedIn)
                    ob.next(user);
                } else if (token && !user) {
                    // If refresh page and have token but not logged user
                    // Verify token and get user
                    this.verifyToken(token).subscribe(
                        usr => {
                            if (!usr || (!usr._id && !usr.success)) {
                                ob.next(undefined);
                            } else {
                                //this.isLoggedIn = true; 
                                //console.log(this.isLoggedIn);this.isLoggedIn = true;console.log(this.isLoggedIn)
                                store.setUser(usr);
                                ob.next(usr);
                            }
                        }
                    );
                } else {
                    // Logged user
                    ob.next(user);
                }
            });
        });
    }

    /**
     * Logout function
     */
    logout() {
        // Clear token and remove user from local storage to log user logout
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        store.setUser(null);
    }

    /**
     * Login by username and SHA-3 password
     *
     * @param {string} username username for login
     * @param {string} password password in SHA-3
     * @param {boolean} remember store token in local storage
     * @returns {Observable<User>} logged user
     */
    login(username: string, password: string, remember: boolean): Observable<User> {
        return this.http.post<User>(this.contextUrl + '/login', { username: username, password: password })
            .pipe(
                tap(user => {this.isLoggedIn=true}),
                tap(user => {this.setSession(user.token);}),
                tap(user => { if (remember) this.setLocal(user.token);}),
                map(user => user),
                shareReplay()
            );
    }

    /**
     * Sign up 
     */
    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.contextUrl}/user/signup`, user)
        .pipe(
            tap(user => this.setSession(user.token)),
            map(user => user),
            shareReplay()
        );
        /*
        .pipe(map(data  => { data })
        );
        //*/
    }
    /**
     * Verify JWT token
     *
     * @param {string} token JWT token to verify
     * @returns {Observable<any>} logged user or error message
     */
    verifyToken(token: string): Observable<any> {
        return this.http.post<any>(this.contextUrl + '/verifyToken', { token: token })
            .pipe(
                map(user => user)
            );
    }

    /**
     * Change password of current user
     *
     * @param {string} passwordNew New password to set in SHA-3
     * @param {string} passwordOld Old password to check in SHA-3
     * @returns {Observable<void>} Success or error
     */
    changePassword(passwordNew: string, passwordOld: string): Observable<void> {
        return this.http
            .post<void>(this.contextUrl + '/changePassword', {
                passwordNew: passwordNew,
                passwordOld: passwordOld
            })
            .pipe(
                map(response => response)
            );
    }

    /**
     * Set token in sessionStorage
     *
     * @private
     * @param {*} token JWT token to set in sessionStorage
     */
    private setSession(token) {
        sessionStorage.setItem('token', token);
    }

    /**
     * Set token in localStorage
     *
     * @private
     * @param {*} token JWT token to set in localStorage
     */
    private setLocal(token) {
        localStorage.setItem('token', token);
    }
}