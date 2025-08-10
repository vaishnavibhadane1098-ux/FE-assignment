import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BedroomsComponent } from './components/bedrooms/bedrooms.component';
import { SensorsComponent } from './components/sensors/sensors.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch()), // enable fetch support
    provideRouter([
      { path: '', redirectTo: 'bedrooms', pathMatch: 'full' },
      { path: 'bedrooms', component: BedroomsComponent },
      { path: 'bedrooms/:id/sensors', component: SensorsComponent }
    ])
  ]
};
