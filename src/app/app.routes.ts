// // app.routes.ts
// import { Routes } from '@angular/router';

// // Import your components
// import { LoginComponent } from './pages/login/login.component';
// import { SignupComponent } from './pages/signup/signup.component';
// import { HomeComponent } from './pages/home/home.component';
// import { PlacesComponent } from './pages/places/places.component';
// import { PlacesdetailComponent } from './pages/placesdetail/placesdetail.component';
// import { GalleryComponent } from './pages/gallery/gallery.component';
// import { VipComponent } from './pages/vip/vip.component';
// import { CairoComponent } from './pages/cairo/cairo.component';
// import { BookingComponent } from './pages/booking/booking.component';

// // Import your auth guard
// import { AuthGuard } from './All_services/guards/auth.guard';
// import { VipDescribComponent } from './pages/vip-describ/vip-describ.component';
// import { BookingVipComponent } from './pages/booking-vip/booking-vip.component';
// import { NileDescribComponent } from './pages/nile-describ/nile-describ.component';

// export const routes: Routes = [
//      { path: 'login', component: LoginComponent },
//      { path: 'signup', component: SignupComponent },
//      {
//           path: 'home',
//           component: HomeComponent,
//      },
//      {
//           path: 'places',
//           component: PlacesComponent,

//      },
//      {
//           path: 'details/:id',
//           component: PlacesdetailComponent,
//      },
//      {
//           path: 'gallery',
//           component: GalleryComponent,
//      },
//      {
//           path: 'vip',
//           component: VipComponent,
//      },
//      {
//           path: 'vip/details',
//           component: VipDescribComponent,
//      },
//      {
//           path: 'vip/booking-vip/:title/:price',
//           component: BookingVipComponent,
//      },
//      {
//           path: 'nile',
//           component: NileDescribComponent,
//      },

//      {
//           path: 'nile/booking-nile/:title/:price',
//           component: BookingVipComponent,
//      },
//      {
//           path: 'cairo',
//           component: CairoComponent,
//      },
//      {
//           path: 'booking/:id',
//           component: BookingComponent,
//           canActivate: [AuthGuard]
//      },

//      // Default route to Home
//      { path: '', redirectTo: '/home', pathMatch: 'full' },
//      // Wildcard route to Home if no route is matched
//      { path: '**', redirectTo: '/home', pathMatch: 'full' }
// ];

import { Routes } from '@angular/router';
// Import your auth guard
import { AuthGuard } from './All_services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'places',
    loadComponent: () =>
      import('./pages/places/places.component').then((m) => m.PlacesComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/placesdetail/placesdetail.component').then(
        (m) => m.PlacesdetailComponent
      ),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
  },
  {
    path: 'vip',
    loadComponent: () =>
      import('./pages/vip/vip.component').then((m) => m.VipComponent),
  },
  {
    path: 'vip/details',
    loadComponent: () =>
      import('./pages/vip-describ/vip-describ.component').then(
        (m) => m.VipDescribComponent
      ),
  },
  {
    path: 'vip/booking-vip/:title/:price',
    loadComponent: () =>
      import('./pages/booking-vip/booking-vip.component').then(
        (m) => m.BookingVipComponent
      ),
  },
  {
    path: 'nile',
    loadComponent: () =>
      import('./pages/nile-describ/nile-describ.component').then(
        (m) => m.NileDescribComponent
      ),
  },
  {
    path: 'nile/booking-nile/:title/:price',
    loadComponent: () =>
      import('./pages/booking-nile/booking-nile.component').then(
        (m) => m.BookingNileComponent
      ),
  },
  {
    path: 'cairo',
    loadComponent: () =>
      import('./pages/cairo/cairo.component').then((m) => m.CairoComponent),
  },
  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./pages/booking/booking.component').then((m) => m.BookingComponent),
    canActivate: [AuthGuard],
  },
  // Default route to Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Wildcard route to Home if no route is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
