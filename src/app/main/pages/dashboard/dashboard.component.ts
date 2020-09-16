import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public widgets: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['transaction', 'name', 'date', 'amount', 'action'];
  public dataSource = new MatTableDataSource<any>(
    [
      {transaction: 1, name: 'Hydrogen', date: 1.0079, amount: 'H'},
      {transaction: 2, name: 'Helium', date: 4.0026, amount: 'He'},
      {transaction: 3, name: 'Lithium', date: 6.941, amount: 'Li'},
      {transaction: 4, name: 'Beryllium', date: 9.0122, amount: 'Be'},
      {transaction: 5, name: 'Boron', date: 10.811, amount: 'B'},
      {transaction: 6, name: 'Carbon', date: 12.0107, amount: 'C'},
      {transaction: 7, name: 'Nitrogen', date: 14.0067, amount: 'N'},
      {transaction: 8, name: 'Oxygen', date: 15.9994, amount: 'O'},
      {transaction: 9, name: 'Fluorine', date: 18.9984, amount: 'F'},
      {transaction: 10, name: 'Neon', date: 20.1797, amount: 'Ne'},
      {transaction: 11, name: 'Sodium', date: 22.9897, amount: 'Na'},
      {transaction: 12, name: 'Magnesium', date: 24.305, amount: 'Mg'},
      {transaction: 13, name: 'Aluminum', date: 26.9815, amount: 'Al'},
      {transaction: 14, name: 'Silicon', date: 28.0855, amount: 'Si'},
      {transaction: 15, name: 'Phosphorus', date: 30.9738, amount: 'P'},
      {transaction: 16, name: 'Sulfur', date: 32.065, amount: 'S'},
      {transaction: 17, name: 'Chlorine', date: 35.453, amount: 'Cl'},
      {transaction: 18, name: 'Argon', date: 39.948, amount: 'Ar'},
      {transaction: 19, name: 'Potassium', date: 39.0983, amount: 'K'},
      {transaction: 20, name: 'Calcium', date: 40.078, amount: 'Ca'},
    ]
  );
  constructor(
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.widgets = {
      widget2: {
          conversion: {
              value   : 492,
              ofTarget: 13
          },
          chartType : 'bar',
          datasets  : [
              {
                  label: 'Conversion',
                  data : [221, 428, 492, 471, 413, 344, 294]
              }
          ],
          labels    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          colors    : [
              {
                  borderColor    : environment.themeColor,
                  backgroundColor: environment.themeColor
              }
          ],
          options   : {
              spanGaps           : false,
              legend             : {
                  display: false
              },
              maintainAspectRatio: false,
              layout             : {
                  padding: {
                      top   : 24,
                      left  : 16,
                      right : 16,
                      bottom: 16
                  }
              },
              scales             : {
                  xAxes: [
                      {
                          display: false
                      }
                  ],
                  yAxes: [
                      {
                          display: false,
                          ticks  : {
                              min: 100,
                              max: 500
                          }
                      }
                  ]
              }
          }
      },
      widget3: {
          impressions: {
              value   : '87k',
              ofTarget: 12
          },
          chartType  : 'line',
          datasets   : [
              {
                  label: 'Impression',
                  data : [67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000, 110000, 149000, 98000],
                  fill : false
              }
          ],
          labels     : ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
          colors     : [
              {
                  borderColor: environment.themeColor
              }
          ],
          options    : {
              spanGaps           : false,
              legend             : {
                  display: false
              },
              maintainAspectRatio: false,
              elements           : {
                  point: {
                      radius          : 2,
                      borderWidth     : 1,
                      hoverRadius     : 2,
                      hoverBorderWidth: 1
                  },
                  line : {
                      tension: 0
                  }
              },
              layout             : {
                  padding: {
                      top   : 24,
                      left  : 16,
                      right : 16,
                      bottom: 16
                  }
              },
              scales             : {
                  xAxes: [
                      {
                          display: false
                      }
                  ],
                  yAxes: [
                      {
                          display: false,
                          ticks  : {
                              // min: 100,
                              // max: 500
                          }
                      }
                  ]
              }
          }
      },
      widget4: {
          visits   : {
              value   : 882,
              ofTarget: -9
          },
          chartType: 'bar',
          datasets : [
              {
                  label: 'Visits',
                  data : [432, 428, 327, 363, 456, 267, 231]
              }
          ],
          labels   : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          colors   : [
              {
                  borderColor    : environment.themeColor,
                  backgroundColor: environment.themeColor
              }
          ],
          options  : {
              spanGaps           : false,
              legend             : {
                  display: false
              },
              maintainAspectRatio: false,
              layout             : {
                  padding: {
                      top   : 24,
                      left  : 16,
                      right : 16,
                      bottom: 16
                  }
              },
              scales             : {
                  xAxes: [
                      {
                          display: false
                      }
                  ],
                  yAxes: [
                      {
                          display: false,
                          ticks  : {
                              min: 150,
                              max: 500
                          }
                      }
                  ]
              }
          }
      },
      widget5: {
          chartType: 'line',
          datasets : {
              'yesterday': [
                  {
                      label: 'Visitors',
                      data : [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
                      fill : 'start'

                  },
                  {
                      label: 'Page views',
                      data : [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                      fill : 'start'
                  }
              ],
              'today'    : [
                  {
                      label: 'Visitors',
                      data : [410, 380, 320, 290, 190, 390, 250, 380, 300, 340, 220, 290],
                      fill : 'start'
                  },
                  {
                      label: 'Page Views',
                      data : [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800],
                      fill : 'start'

                  }
              ]
          },
          labels   : ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
          colors   : [
              {
                  borderColor              : environment.themeColor,
                  backgroundColor          : environment.themeColor,
                  pointBackgroundColor     : environment.themeColor,
                  pointHoverBackgroundColor: environment.themeColor,
                  pointBorderColor         : '#ffffff',
                  pointHoverBorderColor    : '#ffffff'
              },
              {
                  borderColor              : environment.themeTransparentColor,
                  backgroundColor          : environment.themeTransparentColor,
                  pointBackgroundColor     : environment.themeTransparentColor,
                  pointHoverBackgroundColor: environment.themeTransparentColor,
                  pointBorderColor         : '#ffffff',
                  pointHoverBorderColor    : '#ffffff'
              }
          ],
          options  : {
              spanGaps           : false,
              legend             : {
                  display: false
              },
              maintainAspectRatio: false,
              tooltips           : {
                  transaction : 'nearest',
                  mode     : 'index',
                  intersect: false
              },
              layout             : {
                  padding: {
                      left : 24,
                      right: 32
                  }
              },
              elements           : {
                  point: {
                      radius          : 4,
                      borderWidth     : 2,
                      hoverRadius     : 4,
                      hoverBorderWidth: 2
                  }
              },
              scales             : {
                  xAxes: [
                      {
                          gridLines: {
                              display: false
                          },
                          ticks    : {
                              fontColor: 'rgba(0,0,0,0.54)'
                          }
                      }
                  ],
                  yAxes: [
                      {
                          gridLines: {
                              tickMarkLength: 16
                          },
                          ticks    : {
                              stepSize: 1000
                          }
                      }
                  ]
              },
              plugins            : {
                  filler: {
                      propagate: false
                  }
              }
          }
      }
  };
  }

}
