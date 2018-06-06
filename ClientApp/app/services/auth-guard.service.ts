import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(protected auth: AuthService) {}

    canActivate(){
        if(this.auth.isAuthenticated()) {
            // console.log(this.auth.isAuthenticated());
            return true;
        }

        window.location.href = 'https://neelanlearns.auth0.com/login?client=vWBS8Cqj17PabvdOa38tIo1VXcT1Idbq'
        return false;
    }
}