import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../common/button/button.component';
import { ClickOutsideDirective } from '../../directive/click-outside-directive.directive';
import { DropdownMenuComponent } from '../../dropdown-menu/dropdown-menu.component';
import { UserInfo } from '../../models/UserInfo';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, DropdownMenuComponent, ClickOutsideDirective, FontAwesomeModule, ButtonComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements AfterViewInit {

  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  isScreenSmall: boolean = false;
  isMobileMenuOpen: boolean = true;
  infoProfile: UserInfo = {
    name: '',
    email: '',
    permissions: [],
    picture: ''
  };
  isAdmin: boolean = false;

  constructor(private _authService: AuthService, private _userService: UserService, private _loaderService: LoadingService) {
  }

  ngAfterViewInit() {
    this._loaderService.show();
    this._userService
      .getUserInfo(this._authService.currentUser.email)
      .then((userInfo: any) => {
        this.infoProfile = {
          name: userInfo.name,
          email: userInfo.email,
          permissions: Object.keys(userInfo.permissions).filter((key) => userInfo.permissions[key]),
          picture: userInfo.picture
        };
        this.isAdmin = this.infoProfile.permissions.includes('admin');
      }).catch(() => {
        console.error('Error al obtener la información del usuario');
      })
      .finally(() => {
        this._loaderService.hide();
      });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    console.log('dsadasdsa', this._authService);
    this._authService.signOut();
  }

  onOutsideMenu(): void {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isScreenSmall = event.target.innerWidth < 960;
    if (!this.isScreenSmall) {
      this.isMobileMenuOpen = false;
    }
  }

  get userPhoto() {
    return this.infoProfile.picture || 'assets/img/user.png';
  }
}