import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { truncateTextLength } from 'constants/globalFunctions';

@Component({
  selector: 'app-ip-blocking-table',
  templateUrl: './ip-blocking-table.component.html',
  styleUrls: ['./ip-blocking-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class IpBlockingTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength ;
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  @Input() disableForms: boolean;
  @Output() update = new EventEmitter<any>();
  public actionControlOnHover = -1;
  public displayedColumns: string[] =  ['FraudType', 'FraudDescription', 'IsActive'];
   /**
     * Constructor
     * @param {MatSnackBar} _snackBar
     */
  constructor(
    private readonly _dialog: MatDialog,
  ) {
   }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.ipAddress;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  openDialog(obj) {
    const dialogRef = this._dialog.open(FuseConfirmDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data={
      title: "Confirmation",
      message:"Are you sure you want to Delete this Ip Address?"
    }
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.update.emit(obj);
      }
    })
   }
}
