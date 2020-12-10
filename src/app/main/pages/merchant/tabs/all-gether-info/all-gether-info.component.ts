import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from '@fuse/components/email-dialog/email-dialog.component';
@Component({
  selector: 'app-all-gether-info',
  templateUrl: './all-gether-info.component.html',
  styleUrls: ['./all-gether-info.component.scss']
})
export class AllGetherInfoComponent implements OnInit {
  @Input() onBoardError: string;
  @Input() allInfo: any;
  @Input() step: any;
  @Output() saveAll = new EventEmitter<any>();
  public btnclick :boolean;
  constructor(private readonly _dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  moveToStep(index: number){
    this.step.selectedIndex = index;
  }
  submit(){
     this.saveAll.emit();
     this.btnclick = true
    setTimeout(() => {
      this.btnclick = false;
          }, 5000);
  }

  openDialog(obj) {
    const object:any = {
      SendTo: obj.MerchantAccountSetup.MerchantEmail,
      Subject: obj.EmailSubject,
      BodyContent: obj.EmailBody,
      MerchantName: `${obj.FirstName} ${obj.LastName}`,
      PartnerId: obj.PartnerId
    }
    const dialogRef = this._dialog.open(EmailDialogComponent, {width: '660px'});
    dialogRef.componentInstance.data = object;
  } 
}
