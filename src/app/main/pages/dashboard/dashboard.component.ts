import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionTableComponent } from '../transaction/transaction-table/transaction-table.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public dashboardUserStats: any;
  public widgets: any;
  private _unsubscribeAll: Subject<any>;


  /**
  * Constructor
  *
  * @param {DashboardService} _dashboardService
  * @param {UserConfigService} _userConfigService
  */
 
 constructor(
   private readonly _dashboardService: DashboardService,
   private readonly _userConfigService: UserConfigService,
   private readonly _resolver: ComponentFactoryResolver

) { 
         // Set the private defaults
         this._unsubscribeAll = new Subject();
}

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getDashboardStats())
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
                  position : 'nearest',
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

ngOnDestroy(): void {
   // Unsubscribe from all subscriptions
   this._unsubscribeAll.next();
   this._unsubscribeAll.complete();
}
renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.container.clear();
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data;
  }
getDashboardStats(): void{
 this._dashboardService.dasboardStats(this._userConfigService.getUserMode())
 .then((res: any) => {
     if(res && !res.StatusCode){
         this.dashboardUserStats = res.Response;
         if(this.dashboardUserStats && this.dashboardUserStats.Transactions
             && this.dashboardUserStats.Transactions.length){
            this.renderingComponent(TransactionTableComponent, {
              transaction: this.dashboardUserStats.Transactions
            })
          }else{
            this.renderingComponent(NoFoundComponent, {
              icon: 'no-transaction',
              text: 'No Transaction Found',
              subText: "You Haven't made any Transaction yet"
            });
          }
     }
 }).catch((err: HttpErrorResponse)=>(console.log))
}

}
