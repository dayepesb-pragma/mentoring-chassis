import { Injectable, NgZone, inject } from '@angular/core';
import { Auth, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, browserLocalPersistence, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);
  private _ngZone = inject(NgZone); // Inyecta NgZone

  constructor() {
    this._auth.setPersistence(browserLocalPersistence)
    this._auth.onAuthStateChanged(user => {
      this._ngZone.run(() => { // Usa ngZone.run()
        if (user) {
          this._router.navigate(['/dashboard']);
        } else {
          this._router.navigate(['/']);
        }
      });
    });
  }

  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }

  async refreshSession() {
    const user = this._auth.currentUser;
    if (user) {
      const credential = GoogleAuthProvider.credential((await user.getIdTokenResult()).token);
      await signInWithCredential(this._auth, credential);
    } else {
      console.error('No hay un usuario autenticado para refrescar la sesión');
    }
  }

  signOut() {
    signOut(this._auth)
      .catch(error => {
        console.error('Error al cerrar sesión', error);
      }).finally(() => {
        localStorage.clear();
      });
  }

  isLogged(): boolean {
    return !!this._auth.currentUser;
  }

  get currentUser(): any {
    return this._auth.currentUser;
  }
}
