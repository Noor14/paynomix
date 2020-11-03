import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { snackBarConfig, snackBarConfigWarn } from 'constants/globalFunctions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild('userDialog', { static: false }) userDialog: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  public dialogRef;
  @Input() data: any;
  public userForm: FormGroup;
  public displayedColumns: string[] = ['FirstName', 'LastName', 'Username', 'Phone', 'Role', 'LastLogin', 'Action'];
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
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
    });
  }
  updateUser() { 
    this._userService.updateUser(this.userForm.value).then((res: any) => { 
      if (res && !res.StatusCode) {
          console.log(res.Response) 
          this._snackBar.open('User updated successfully!', '', snackBarConfig);
          this.dialogRef.close();
      } else{
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn)
      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }
}
