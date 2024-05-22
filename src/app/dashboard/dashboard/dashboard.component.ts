import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { registerApplication, start, unregisterApplication } from 'single-spa';
import { AlertService } from '../../service/alert.service';
import { LoadingService } from '../../service/loading.service';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy, OnInit {

  private _loadingService: LoadingService = inject(LoadingService);
  private _alertService: AlertService = inject(AlertService);
  private _userService: UserService = inject(UserService);
  private _authService: AuthService = inject(AuthService);

  async ngOnInit() {
    registerApplication({
      name: 'mentoring-app',
      app: () => System.import('mentoring-app').then((module) => module.default),
      activeWhen: location => location.pathname.startsWith('/dashboard'),
      customProps: {
        loadingService: this._loadingService,
        alertService: this._alertService,
        userService: this._userService,
        isMentorAdmin: await this._userService.isMentorAdmin(this._authService.currentUser.email),
      }
    });

    start({
      urlRerouteOnly: true,
    });
  }

  ngOnDestroy() {
    unregisterApplication('mentoring-app');
  }
}
