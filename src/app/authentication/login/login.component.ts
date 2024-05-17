import { Component, inject } from '@angular/core';
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
