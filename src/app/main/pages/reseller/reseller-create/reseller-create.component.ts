import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reseller-create',
  templateUrl: './reseller-create.component.html',
  styleUrls: ['./reseller-create.component.scss']
})
export class ResellerCreateComponent implements OnInit {
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
