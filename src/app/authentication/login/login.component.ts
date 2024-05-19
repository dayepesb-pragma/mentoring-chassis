import { Component, inject } from '@angular/core';
import { registerApplication, start } from 'single-spa';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _service = inject(AuthService);

  constructor() {
    registerApplication(
      'test-app',
      () => System.import('test').then((module) => module.default),
      location => location.pathname.startsWith('/')
    );

    start({
      urlRerouteOnly: true,
    });
  }

  byGoogle(): void {
    this._service
      .byGoogle()
      .then((a) => {
        console.log("dsadasdasd", a)
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
