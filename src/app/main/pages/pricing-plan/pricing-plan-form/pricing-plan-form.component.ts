import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-plan-form',
  templateUrl: './pricing-plan-form.component.html',
  styleUrls: ['./pricing-plan-form.component.scss']
})
export class PricingPlanFormComponent implements OnInit {

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
