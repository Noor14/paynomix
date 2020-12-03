import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-large-trans-notification',
  templateUrl: './large-trans-notification.component.html',
  styleUrls: ['./large-trans-notification.component.scss']
})
export class LargeTransNotificationComponent implements OnInit {
  public notificationForm :FormGroup;

  /**
     * Constructor
     * @param { FormBuilder } _formBuilder,
     */
  constructor(
    private readonly _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createSettingForm();
  }

  createSettingForm(): void {
    this.notificationForm = this._formBuilder.group({
 
      position:[''],
      TransExceeding:['', Validators.required],
      Email:['', Validators.required],
    })
  }

}
