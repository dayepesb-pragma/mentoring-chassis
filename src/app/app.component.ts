import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LoadingService } from './service/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentorias-pragma';
  loading!: boolean;
  private _loadingService: LoadingService = inject(LoadingService);

  constructor(titleService: Title) {
    titleService.setTitle(`${this.title}`);
  }

  ngOnInit() {
    this._loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
