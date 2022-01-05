import { Component } from '@angular/core';

declare var APP_VERSION: string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-13-use-environment-variables';

  constructor() {
    console.log(`APP_VERSION: ${APP_VERSION}`);
  }
}
