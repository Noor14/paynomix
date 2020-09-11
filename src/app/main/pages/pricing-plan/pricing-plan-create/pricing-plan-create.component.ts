import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing-plan-create',
  templateUrl: './pricing-plan-create.component.html',
  styleUrls: ['./pricing-plan-create.component.scss']
})
export class PricingPlanCreateComponent implements OnInit {

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
