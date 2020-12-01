import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as globalConfig from '../../../../../../constants/globalFunctions';



@Component({
  selector: 'app-country-origin',
  templateUrl: './country-origin.component.html',
  styleUrls: ['./country-origin.component.scss']
})
export class CountryOriginComponent implements OnInit {
    public countryoriginForm: FormGroup;
    public globalConfig = globalConfig;

    list1 = globalConfig.Countries.countries;
      list2 = [

      ];

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

  this.createCOForm();

  }

  createCOForm(): void{
 
    this.countryoriginForm = this._formBuilder.group({
      BlockOrigin: ['0'],
      SelectedCountries: [''],
      ListedCountryAllowOrBlock: [''],
  });
  
  }

  public toggleSelection(item, list) {
    item.selected = !item.selected;
  }

  public moveSelected(direction) {
    if (direction === 'left') {
      this.list2.forEach(item => {
        if (item.selected) {
          this.list1.push(item);
        }
      });
      this.list2 = this.list2.filter(i => !i.selected);
    } else {
      this.list1.forEach(item => {
        if (item.selected) {
          this.list2.push(item);
        }
      });
      this.list1 = this.list1.filter(i => !i.selected);
    }
  }

  public moveAll(direction) {
    if (direction === 'left') {
      this.list1 = [...this.list1, ...this.list2];
      this.list2 = [];
    } else {
      this.list2 = [...this.list2, ...this.list1];
      this.list1 = [];
    }
  }


}
