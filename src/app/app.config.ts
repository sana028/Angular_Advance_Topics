import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { _checkOutDetailsReducer } from './checkoutpage/store/checkout.reducer';
import { provideEffects } from '@ngrx/effects';
import { PaymentEffect } from './redux/placeorder/store/order.effect';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { _placeTheOrderReducer } from './redux/placeorder/store/order.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({ addressInfo: _checkOutDetailsReducer, placeTheOrder:_placeTheOrderReducer}),
    provideEffects([PaymentEffect]),
    provideAnimations()
],
};
