import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})
export class DropdownMenuComponent {
  @Input() photo: string = "";
  @Output() logout = new EventEmitter<void>();

  faSignOutAlt = faSignOutAlt;

  showDropdown = false;

  onLogout() {
    this.logout.emit(); // Utiliza el método emit para emitir un evento
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
