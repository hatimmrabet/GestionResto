import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Restaurant';
  isAuth = false;

  appareils = [
    {
      name: 'Machine à laver',
      status: 'allumer',
    },
    {
      name: 'machine a cafe',
      status: 'éteint',
    },
    {
      name: 'xbox',
      status: 'allumer',
    },
  ];

  constructor() {
    setTimeout(() => {
      this.isAuth = true;
    }, 3000);
  }

  onAllumer() {
    console.log('on allume tout');
  }
}
