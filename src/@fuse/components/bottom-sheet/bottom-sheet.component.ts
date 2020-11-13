import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { truncateTextLength } from '../../../constants/globalFunctions';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class BottomSheetComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() repeatingItems: any[] = [];
  @Input() selectedId: number;
  @Input() drawerConfig: any = {};
  @Output() selected = new EventEmitter<number>();
  @Output() close = new EventEmitter<boolean>();
  public truncateTextLength = truncateTextLength;
  constructor() { }

  ngOnInit(): void {
  }

  selectedItem(id: number): void{
    if(this.selectedId != id){
      this.selected.emit(id);
      this.selectedId = id;
    }
    this.closeDrawer();
  }
  closeDrawer(): void{
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }
}
