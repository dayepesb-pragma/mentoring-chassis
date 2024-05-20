import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDYlhGlsrWyl5fEThEzAyNNhSburZoHq1g",
      authDomain: "mentorias-dcc30.firebaseapp.com",
      projectId: "mentorias-dcc30",
      storageBucket: "mentorias-dcc30.appspot.com",
      messagingSenderId: "482316302955",
      appId: "1:482316302955:web:7b6f190c395e61b194cf2e",
      measurementId: "G-XMTKQDPSY4"
    })),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ]
};
