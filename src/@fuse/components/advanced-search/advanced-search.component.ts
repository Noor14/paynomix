import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'menuInOtherComponent'
})
export class AdvancedSearchComponent implements OnInit {
  @Input() data:any;
  @Output() submitForm = new EventEmitter<any>();
  public SearchForm: FormGroup;
 
  @ViewChild(MatMenu, {static: true}) menu: MatMenu;
    /**
    * Constructor
    * @param {FormBuilder} _formBuilder
    */
  constructor(
    private readonly _formBuilder: FormBuilder,
    ) {
   }

  ngOnInit(): void {
   
    this.SearchForm = this._formBuilder.group({
      MatMenuFields: this._formBuilder.array([])
    });

    this.getMatMenuFields(this.data);
  }
  getMatMenuFields(data: any){
   
    const matMenuFields = this.SearchForm.controls.MatMenuFields as FormArray;
    data.forEach((item: any) => {
     const obj = {
      [item.ControlName]: ''
      };
      const formGroup  = this._formBuilder.group(obj);
      matMenuFields.push(formGroup);
    });
  }
submit(){
 
  const searchingfields = this.SearchForm.value.MatMenuFields.reduce(((r, c) => Object.assign(r, c)), {});
  const searchfields =  Object.entries(searchingfields).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
  this.submitForm.emit(searchfields);

}

stopPropagation($event){
 
  if($event.toElement.textContent !== " Search "){
    $event.stopPropagation();
  }
  
}
}