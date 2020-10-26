import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EmailDialogComponent } from '@fuse/components/email-dialog/email-dialog.component';

@Component({
  selector: 'app-all-gether-info',
  templateUrl: './all-gether-info.component.html',
  styleUrls: ['./all-gether-info.component.scss']
})
export class AllGetherInfoComponent implements OnInit {
  @Input() allInfo: any;
  @Input() step: any;
  @Output() saveAll = new EventEmitter<any>();

  constructor(private readonly _dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  moveToStep(index: number){
    this.step.selectedIndex = index;
  }
  submit(){
     this.saveAll.emit();
  }
  openDialog() { 
    const obj:any = {
      SendTo: this.allInfo.MerchantAccountSetup.MerchantEmail,
      SendFrom: this.allInfo.Email,
      Subject: this.allInfo.EmailSubject,
      BodyContent: this.allInfo.merchantLink,
      MerchantName: `${this.allInfo.FirstName} ${this.allInfo.LastName}`,
      PartnerId: this.allInfo.PartnerId
    }
    const dialogRef = this._dialog.open(EmailDialogComponent, {width: '660px'});
    dialogRef.componentInstance.data = obj;
   }
}
