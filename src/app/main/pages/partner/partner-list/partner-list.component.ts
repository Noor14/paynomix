import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['partner', 'dbaname', 'firstname', 'lastname', 'action'];
  public dataSource = new MatTableDataSource<any>(
    [
      {partner: 1, dbaname: 'Hydrogen', firstname: 1.0079, lastname: 'H'},
      {partner: 2, dbaname: 'Helium', firstname: 4.0026, lastname: 'He'},
      {partner: 3, dbaname: 'Lithium', firstname: 6.941, lastname: 'Li'},
      {partner: 4, dbaname: 'Beryllium', firstname: 9.0122, lastname: 'Be'},
      {partner: 5, dbaname: 'Boron', firstname: 10.811, lastname: 'B'},
      {partner: 6, dbaname: 'Carbon', firstname: 12.0107, lastname: 'C'},
      {partner: 7, dbaname: 'Nitrogen', firstname: 14.0067, lastname: 'N'},
      {partner: 8, dbaname: 'Oxygen', firstname: 15.9994, lastname: 'O'},
      {partner: 9, dbaname: 'Fluorine', firstname: 18.9984, lastname: 'F'},
      {partner: 10, dbaname: 'Neon', firstname: 20.1797, lastname: 'Ne'},
      {partner: 11, dbaname: 'Sodium', firstname: 22.9897, lastname: 'Na'},
      {partner: 12, dbaname: 'Magnesium', firstname: 24.305, lastname: 'Mg'},
      {partner: 13, dbaname: 'Aluminum', firstname: 26.9815, lastname: 'Al'},
      {partner: 14, dbaname: 'Silicon', firstname: 28.0855, lastname: 'Si'},
      {partner: 15, dbaname: 'Phosphorus', firstname: 30.9738, lastname: 'P'},
      {partner: 16, dbaname: 'Sulfur', firstname: 32.065, lastname: 'S'},
      {partner: 17, dbaname: 'Chlorine', firstname: 35.453, lastname: 'Cl'},
      {partner: 18, dbaname: 'Argon', firstname: 39.948, lastname: 'Ar'},
      {partner: 19, dbaname: 'Potassium', firstname: 39.0983, lastname: 'K'},
      {partner: 20, dbaname: 'Calcium', firstname: 40.078, lastname: 'Ca'},
    ])
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
