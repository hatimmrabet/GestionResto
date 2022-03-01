import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss'],
})
export class AppareilComponent implements OnInit {
  @Input() appName: string;
  @Input() appStatus: string;

  constructor() {}

  ngOnInit(): void {}

  getStatus() {
    return this.appStatus;
  }

  getColor() {
    if (this.appStatus === 'allumer') return 'red';
    else return 'green';
  }
}
