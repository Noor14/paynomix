import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proxy-blocking',
  templateUrl: './proxy-blocking.component.html',
  styleUrls: ['./proxy-blocking.component.scss']
})
export class ProxyBlockingComponent implements OnInit {
@Input() fraudType : any
  constructor() { }

  ngOnInit() {
  }

}
