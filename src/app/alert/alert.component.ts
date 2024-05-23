import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faCheck, faExclamationTriangle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('600ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('600ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  alerts: { type: 'error' | 'warning' | 'success', message: string, isVisible: boolean }[] = [];
  faTimes = faTimes;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;
  faTimesCircle = faTimesCircle;

  constructor(private _alertService: AlertService) { }

  ngOnInit(): void {
    this._alertService.alert$.subscribe(alert => {
      let newAlert = { ...alert, isVisible: true };
      this.alerts.push(newAlert);
      setTimeout(() => this.hideAlert(newAlert), 20000);
    });
  }

  hideAlert(alert: any): void {
    const index = this.alerts.indexOf(alert);
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }

  close(alert: any): void {
    this.hideAlert(alert);
  }

  alertBackgroundColor(type: 'error' | 'warning' | 'success'): string {
    switch (type) {
      case 'error': return 'rgba(255, 0, 0, 0.7)'; // Rojo semi-transparente
      case 'warning': return 'rgba(255, 255, 0, 0.7)'; // Amarillo semi-transparente
      case 'success': return 'rgba(0, 128, 0, 0.7)'; // Verde semi-transparente
    }
  }

  alertBorderColor(type: 'error' | 'warning' | 'success'): string {
    switch (type) {
      case 'error': return 'rgb(255, 0, 0)'; // Rojo
      case 'warning': return 'rgb(255, 255, 0)'; // Amarillo
      case 'success': return 'rgb(0, 128, 0)'; // Verde
    }
  }
}