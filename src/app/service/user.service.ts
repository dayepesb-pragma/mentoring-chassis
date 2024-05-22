import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _firestore: AngularFirestore) { }

  async getUserInfo(email: string): Promise<any> {
    return firstValueFrom(this._firestore
      .collection('users')
      .doc(email)
      .get()
    ).then((doc) => doc.data());
  }

  existsUser(email: string): Promise<boolean> {
    return firstValueFrom(this._firestore
      .collection('users')
      .doc(email)
      .get()
    ).then((doc) => doc.exists);
  }

  async saveNewUser(userInfo: any): Promise<void> {
    if (!userInfo.email) throw new Error('Email is required');
    const userExists = await this.existsUser(userInfo.email);
    if (!userExists) {
      return this._firestore
        .collection('users')
        .doc(userInfo.email)
        .set({
          ...userInfo,
          permissions: {
            admin: false,
            editor: false,
            viewer: true,
          }
        });
    }
    console.log('User exists');
    return Promise.resolve();
  }
}
