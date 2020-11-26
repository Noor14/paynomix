import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AuthenticationComponent implements OnInit {
  public backgroundImage: string = undefined;
  constructor() { }

  ngOnInit(): void {
    const images: string[] = ['image1.jpg', 'image3.jpg'];
    const index = Math.floor(Math.random() * images.length);
    this.backgroundImage = images[index];
  }

}
