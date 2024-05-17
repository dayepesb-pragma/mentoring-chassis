import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-layout',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'

})
export class AuthLayoutComponent {

}
