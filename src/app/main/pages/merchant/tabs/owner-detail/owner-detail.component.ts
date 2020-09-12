import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss']
})
export class OwnerDetailComponent implements OnInit {
 
  @Input() ownerDetail: any;

  constructor() { }

  ngOnInit(): void {
  }

}
