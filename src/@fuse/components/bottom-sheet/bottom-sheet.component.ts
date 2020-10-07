import { Component, Input, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations   : fuseAnimations

})
export class BottomSheetComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() repeatingItems: any[] = [];
  constructor() { }

  ngOnInit() {
  }
 
}
