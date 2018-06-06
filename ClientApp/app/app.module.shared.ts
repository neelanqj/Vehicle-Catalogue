import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { PhotoService } from './services/photo.service';
import { VehicleService } from './services/vehicle.service';
import { BrowserXhr } from '@angular/http';
import { AppErrorHandler } from './app.error-handler';
import { CallbackComponent } from './components/callback/callback.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from "ng2-toasty";
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ChartModule } from 'angular2-chartjs';
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,

        VehicleListComponent,
        VehicleFormComponent,
        ViewVehicleComponent,
        PaginationComponent,
        CallbackComponent,
        AdminComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'vehicles',  component: VehicleListComponent},
            { path: 'vehicles/new',  component: VehicleFormComponent, canActivate: [ AuthGuardService ] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [ AuthGuardService ] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'callback', component: CallbackComponent },
            { path: 'admin',  component: AdminComponent, canActivate: [ AdminAuthGuardService ] },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [        
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AuthService,
        AuthGuardService,
        AdminAuthGuardService,
        AUTH_PROVIDERS,
        PhotoService,
        VehicleService
    ]
};
