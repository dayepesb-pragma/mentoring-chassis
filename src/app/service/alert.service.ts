import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _alertSubject = new Subject<{ type: 'error' | 'alert' | 'success', message: string }>();

  alert$ = this._alertSubject.asObservable();

  alert(type: 'error' | 'alert' | 'success', message: string): void {
    this._alertSubject.next({ type, message });
  }
}