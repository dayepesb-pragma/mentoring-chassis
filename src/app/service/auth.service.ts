import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, browserLocalPersistence, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);

  constructor() {
    this._auth.setPersistence(browserLocalPersistence)
    this._auth.onAuthStateChanged(user => {
      if (user) {
        this._router.navigate(['/dashboard']);
      } else {
        this._router.navigate(['/login']);
      }
    });
  }

  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider()).then(async result => {
      return result;
    });
  }

  async refreshSession() {
    const user = this._auth.currentUser;
    console.log(user)
    if (user) {
      const credential = GoogleAuthProvider.credential((await user.getIdTokenResult()).token);
      const result = await signInWithCredential(this._auth, credential);
      console.log("result", result);
    } else {
      console.error('No hay un usuario autenticado para refrescar la sesión');
    }
  }

  logout() {
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
}
