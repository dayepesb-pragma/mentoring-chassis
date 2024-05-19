import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentorias-pragma';

  constructor(titleService: Title) {
    titleService.setTitle(`${this.title}`);
  }

}
