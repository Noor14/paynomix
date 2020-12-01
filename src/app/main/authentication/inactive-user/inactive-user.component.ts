import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InactiveUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
