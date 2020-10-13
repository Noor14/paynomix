import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-ach-info',
  templateUrl: './ach-info.component.html',
  styleUrls: ['./ach-info.component.scss'],
  animations   : fuseAnimations
})
export class AchInfoComponent implements OnInit {

  public achForm: FormGroup
  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.achForm = this._formBuilder.group({
      RoutingNumber:['', Validators.required],
      AccountNumber: ['', Validators.required]
    });
  }

}
