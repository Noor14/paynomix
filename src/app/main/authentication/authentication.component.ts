import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AuthenticationComponent implements OnInit {
  public backgroundImage: string = undefined;
  constructor(public router: Router) { }

  ngOnInit(): void {
    const images: string[] = ['image1.jpg', 'image3.jpg'];
    const index = Math.floor(Math.random() * images.length);
    this.backgroundImage = images[index];
  }

}
