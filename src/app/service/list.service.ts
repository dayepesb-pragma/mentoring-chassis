import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private _firestore: AngularFirestore) { }

  async getLists(collection: string, document: string): Promise<any> {
    console.log('getLists', collection, document);
    return await firstValueFrom(this._firestore
      .collection(collection)
      .doc(document)
      .get())
      .then((doc) => doc.data());
  }
}
