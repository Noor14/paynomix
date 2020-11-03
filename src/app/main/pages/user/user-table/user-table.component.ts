import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  public dialogRef
  @Input() data: any;
  public userForm: FormGroup;
  public displayedColumns: string[] = ['FirstName', 'LastName', 'Username', 'Phone', 'Role', 'LastLogin', 'Action'];
  constructor(
    private readonly _dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = this.data.users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  openDialog(): void {
    this.dialogRef = this._dialog.open(this.userDialog, {width: '660px'});
    this.createUserForm();
  }
  createUserForm(): void {
    this.userForm = this._formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
    });

  }
}
