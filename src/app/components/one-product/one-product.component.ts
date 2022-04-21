import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss']
})
export class OneProductComponent implements OnInit {

  @Input() productName : string;
  @Input() productPrice : number;

  constructor() { }

  ngOnInit(): void {
  }

}
