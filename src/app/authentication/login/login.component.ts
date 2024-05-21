import { Component, inject } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { AlertService } from '../../service/alert.service';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _loadingService = inject(LoadingService);
  private _alertService = inject(AlertService);

  byGoogle(): void {
    this._loadingService.show();
    this._authService
      .byGoogle()
      .then(async (userData: UserCredential) => {
        console.log(userData);
        if (!userData.user.email?.includes
          ('@pragma.com.co')) {
          await this._authService.signOut();
          this._alertService.alert('error', 'El dominio de correo no es válido');
        } else {
          const userInfo = {
            email: userData.user.email,
            name: userData.user.displayName,
            picture: userData.user.photoURL,
          };

          await this._userService.saveNewUser(userInfo);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this._loadingService.hide();
      });
  }
}
