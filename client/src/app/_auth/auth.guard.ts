
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { store } from './';
import { Observable } from 'rxjs';
import { User } from '../_models/user/';

/**
 * This class intercept route change and check for security
 */
@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        //private http: HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    /**
     * Check routes permission
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        // Get authorized roles for route
        const roles = [];
        Object.keys(route.data).forEach(key => roles.push(route.data[key]));

        // Return observable
        return new Observable<boolean>((ob: any) => {
            // Get logged user
            
            this.authenticationService.getUser().subscribe(user => {
                if (!user) {
                    // Not logged
                    ob.next(false);
                    ob.complete();
                    this.redirectAdmin(roles);
                } else {
                    // Logged user
                    const userObj: User = new User(user._id, user.username, user.token, user.roles);
                    if (roles && roles.length > 0) {
                        // Check roles
                        if (userObj.hasRole(roles)) {
                            ob.next(true);
                            ob.complete();
                        } else {
                            ob.next(false);
                            ob.complete();
                            this.redirectAdmin(roles);

                        }
                    }
                    ob.next(true);
                    ob.complete();
                }
            });//*/
        });
    }
    
    redirectAdmin(roles){
        if(roles.find(rol=>rol=="ADMIN")){
            this.router.navigate(['/dashboard/login']);
        }
    }
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(route, route.params.id);
    }
    
    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
      }
    
      checkLogin(url: string): boolean {
        let found = true;// this.authenticationService.isLoggedIn ;

        if (found) { return true; }
        return false;
    /*
        // Store the attempted URL for redirecting
        this.authenticationService.redirectUrl = url;
    
        // Create a dummy session id
        let sessionId = 123456789;
    
        // Set our navigation extras object
        // that contains our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParams: { 'session_id': sessionId },
          fragment: 'anchor'
        };
    
        // Navigate to the login page with extras
        this.router.navigate(['/login'], navigationExtras);
        return false;
        //*/
      }
  //*/    
}
