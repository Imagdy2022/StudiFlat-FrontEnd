import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            if (!this.authenticationService.isLoggedIn()) {
              this.router.navigate(['/login']);
            }
        const user = this.authenticationService.userValue;

        if (user) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
    }
}
