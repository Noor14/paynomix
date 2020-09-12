import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  @Input() bankAccount: any;

  constructor() { }

  ngOnInit(): void {
  }

}
