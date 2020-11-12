import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { snackBarConfig, snackBarConfigWarn } from 'constants/globalFunctions';
import { UserService } from '../user.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations   : fuseAnimations

})
export class UserTableComponent implements OnInit {
  @ViewChild('userDialog', { static: false }) userDialog: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() updateList = new EventEmitter<boolean>();
  public actionControlOnHover = -1;
  public dataSource = new MatTableDataSource<any>();
  public dialogRef: any;
  @Input() data: any;
  public userForm: FormGroup;
  public displayedColumns: string[] = ['FirstName', 'LastName', 'Username', 'Phone', 'Role', 'LastLogin'];
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _userService : UserService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = this.data.users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  openDialog(data): void { 
    this.dialogRef = this._dialog.open(this.userDialog, {width: '660px'});
    if(!this.userForm){
      this.createUserForm();
    }
    this.userForm.patchValue(data);
  }
  createUserForm(): void {
    this.userForm = this._formBuilder.group({
      UserID : ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: [{value:'', disabled: true}, Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
    });
  }
  updateUser() { 
    this._userService.updateUser(this.userForm.value).then((res: any) => { 
      if (res && !res.StatusCode) {
          this._snackBar.open('User updated successfully!', '', snackBarConfig);
          this.updateList.emit(true);
          this.dialogRef.close();
      } else{
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn)
      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }
}
