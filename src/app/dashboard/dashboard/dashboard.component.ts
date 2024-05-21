import { Component, inject } from '@angular/core';
import { registerApplication, start } from 'single-spa';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private _loadingService: LoadingService = inject(LoadingService);

  constructor() {
    registerApplication({
      name: 'mentoring-app',
      app: () => System.import('mentoring-app').then((module) => module.default),
      activeWhen: location => location.pathname.startsWith('/dashboard'),
      customProps: {
        loadingService: this._loadingService,
      }
    });

    start({
      urlRerouteOnly: true,
    });
  }
}
