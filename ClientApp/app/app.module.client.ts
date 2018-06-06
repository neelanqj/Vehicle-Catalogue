import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { AuthService } from './services/auth.service';
import * as Raven from 'raven-js';

Raven
  .config('https://eb2e3df6cfcf472d976cd3dd86823617@sentry.io/183507')
  .install();

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },        
        ...sharedConfig.providers
    ]
})
export class AppModule {
}
