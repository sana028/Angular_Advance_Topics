import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/card/card.component').then((m) => m.CardComponent),
  },
  {
    path: 'cart-page',
    loadComponent: () =>
      import('../app/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent
      ),
  },
  {
    path: 'check-out',
    loadComponent: () =>
      import('./checkoutpage/checkoutpage.component').then(
        (m) => m.CheckoutpageComponent
      ),
  },
  {
    path: 'place-order',
    loadComponent: () =>
      import('./redux/placeorder/placeorder.component').then(
        (m) => m.PlaceorderComponent
      ),
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./order-success/order-success.component').then(
        (m) => m.OrderSuccessComponent
      ),
  },
  {
    path: 'stocks',
    loadComponent: () =>
      import('./types-of-subjects/types-of-subjects.component').then(
        (m) => m.TypesOfSubjectsComponent
      ),
  },
  {
    path: 'observable-promise',
    loadComponent: () =>
      import('./observables-promise/observables-promise.component').then(
        (m) => m.ObservablesPromiseComponent
      ),
  },
];
