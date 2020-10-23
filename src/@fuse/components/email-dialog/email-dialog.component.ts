import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {
 emailForm: FormGroup
  constructor() { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      select: new FormControl('')
    })
  }

}
