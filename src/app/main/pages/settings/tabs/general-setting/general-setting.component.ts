import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit {

  public step: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  setStep(index: number): void {
    this.step = index;
  }
}
