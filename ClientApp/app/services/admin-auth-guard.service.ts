import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AdminAuthGuardService extends AuthGuardService {

    constructor(auth: AuthService) {
        super(auth);
    }

    canActivate(){
        var isAuthenticated = super.canActivate();

        if(isAuthenticated)
            return this.auth.isInRole('Admin');
        
        return false;
    }
}