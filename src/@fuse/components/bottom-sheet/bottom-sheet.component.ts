import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() selectedId: number;
  @Input() drawerConfig: any = {};
  @Output() selected = new EventEmitter<number>();
  @Output() close = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  selectedItem(id: number): void{
    this.selected.emit(id);
    this.selectedId = id;
    this.isOpen = false;
  }
  closeDrawer(): void{
    this.close.emit(false);
  }
}
