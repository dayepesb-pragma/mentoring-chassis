import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DropdownMenuComponent } from '../../dropdown-menu/dropdown-menu.component';
import { UserInfo } from '../../models/UserInfo';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, DropdownMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  isScreenSmall: boolean = false;
  isMobileMenuOpen: boolean = false;
  infoProfile: UserInfo = {
    name: '',
    email: '',
    permissions: [],
    picture: ''
  };

  constructor(private _authService: AuthService, private _userService: UserService, private _loaderService: LoadingService) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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