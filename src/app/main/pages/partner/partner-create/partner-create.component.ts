import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.scss']
})
export class PartnerCreateComponent implements OnInit {
  public form: FormGroup;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
     this.form = this._formBuilder.group({
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required],
  });
  }

}
