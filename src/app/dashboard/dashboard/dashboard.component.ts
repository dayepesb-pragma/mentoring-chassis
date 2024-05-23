import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { registerApplication, start, unregisterApplication } from 'single-spa';
import { AlertService } from '../../service/alert.service';
import { AuthService } from '../../service/auth.service';
import { ListService } from '../../service/list.service';
import { LoadingService } from '../../service/loading.service';
import { UserService } from '../../service/user.service';

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
  private _listService: ListService = inject(ListService);

  async ngOnInit() {

    console.log(await this._listService.getLists('lists', 'general'));
    registerApplication({
      name: 'mentoring-app',
      app: () => System.import('mentoring-app').then((module) => module.default),
      activeWhen: location => location.pathname.startsWith('/dashboard'),
      customProps: {
        loadingService: this._loadingService,
        alertService: this._alertService,
        userService: this._userService,
        listService: this._listService,
        isMentorAdmin: this._userService.isMentorAdmin(this._authService.currentUser.email),
        isLogged: this._authService.isLogged,
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
