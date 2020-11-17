import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { truncateTextLength } from '../../../constants/globalFunctions';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class BottomSheetComponent implements OnInit, OnChanges{

  @Input() isOpen: boolean = false;
  @Input() repeatingItems: any[] = [];
  @Input() selectedId: number;
  @Input() drawerConfig: any = {};
  @Output() selected = new EventEmitter<number>();
  @Output() close = new EventEmitter<boolean>();
  public truncateTextLength = truncateTextLength;
  public selectedName: string;
  constructor() { }

  ngOnInit(): void {
  
  }
  ngOnChanges(): void{
    if(this.selectedId && this.repeatingItems.length){
      this.selectedName = this.repeatingItems.find(obj => obj.id == this.selectedId).name
    }
  }

  selectedItem(obj): void{
    if(this.selectedId != obj.id){
      this.selected.emit(obj.id);
      this.selectedId = obj.id;
      this.selectedName = obj.name;
    }
    this.closeDrawer();
  }
  closeDrawer(): void{
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }
}
