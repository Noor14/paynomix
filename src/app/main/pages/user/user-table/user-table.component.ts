import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { snackBarConfig, snackBarConfigWarn, validateAllFormFields, validator ,truncateTextLength} from '../../../../../constants/globalFunctions';
import { UserService } from '../user.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations   : fuseAnimations

})
export class UserTableComponent implements OnInit {
  public validator = validator;
  public truncateTextLength = truncateTextLength;
  @ViewChild('userDialog') userDialog: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() updateList = new EventEmitter<boolean>();
  public actionControlOnHover = -1;
  public dataSource = new MatTableDataSource<any>();
  public dialogRef: any;
  @Input() data: any;
  public userForm: FormGroup;
  private userObj: any ={};
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
  openDialog(obj): void { 
    this.dialogRef = this._dialog.open(this.userDialog, {width: '660px'});
    if(!this.userForm){
      this.createUserForm();
    }
    this.userObj = obj
    this.userForm.patchValue(this.userObj);
  }
  createUserForm(): void {
    this.userForm = this._formBuilder.group({
      FirstName: ['',[ Validators.required, Validators.maxLength(validator.maxName)]],
      LastName: ['',[ Validators.required, Validators.maxLength(validator.maxName)]],
      Username: [{value:'', disabled: true}, Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
      Phone: ['', Validators.required],
    });
  }
  updateUser() { 
    if(this.userForm.valid){
      this._userService.updateUser({...this.userObj, ...this.userForm.value}).then((res: any) => { 
        if (res && !res.StatusCode) {
            this._snackBar.open('User updated successfully!', '', snackBarConfig);
            this.updateList.emit(true);
            this.dialogRef.close();
        } else{
          this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn)
        }
      }).catch((err: HttpErrorResponse)=>(console.log))
    }else{
      validateAllFormFields(this.userForm);
    }
    }

}
