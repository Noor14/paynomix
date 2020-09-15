import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['UserRole', 'Username', 'Email', 'LastLogin', 'Action'];
  public dataSource = new MatTableDataSource<any>(
    [
      {UserRole: 1, Username: 'Hydrogen', Email: 1.0079, LastLogin: 'H'},
      {UserRole: 2, Username: 'Helium', Email: 4.0026, LastLogin: 'He'},
      {UserRole: 3, Username: 'Lithium', Email: 6.941, LastLogin: 'Li'},
      {UserRole: 4, Username: 'Beryllium', Email: 9.0122, LastLogin: 'Be'},
      {UserRole: 5, Username: 'Boron', Email: 10.811, LastLogin: 'B'},
      {UserRole: 6, Username: 'Carbon', Email: 12.0107, LastLogin: 'C'},
      {UserRole: 7, Username: 'Nitrogen', Email: 14.0067, LastLogin: 'N'},
      {UserRole: 8, Username: 'Oxygen', Email: 15.9994, LastLogin: 'O'},
      {UserRole: 9, Username: 'Fluorine', Email: 18.9984, LastLogin: 'F'},
      {UserRole: 10, Username: 'Neon', Email: 20.1797, LastLogin: 'Ne'},
      {UserRole: 11, Username: 'Sodium', Email: 22.9897, LastLogin: 'Na'},
      {UserRole: 12, Username: 'Magnesium', Email: 24.305, LastLogin: 'Mg'},
      {UserRole: 13, Username: 'Aluminum', Email: 26.9815, LastLogin: 'Al'},
      {UserRole: 14, Username: 'Silicon', Email: 28.0855, LastLogin: 'Si'},
      {UserRole: 15, Username: 'Phosphorus', Email: 30.9738, LastLogin: 'P'},
      {UserRole: 16, Username: 'Sulfur', Email: 32.065, LastLogin: 'S'},
      {UserRole: 17, Username: 'Chlorine', Email: 35.453, LastLogin: 'Cl'},
      {UserRole: 18, Username: 'Argon', Email: 39.948, LastLogin: 'Ar'},
      {UserRole: 19, Username: 'Potassium', Email: 39.0983, LastLogin: 'K'},
      {UserRole: 20, Username: 'Calcium', Email: 40.078, LastLogin: 'Ca'},
    ])
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
