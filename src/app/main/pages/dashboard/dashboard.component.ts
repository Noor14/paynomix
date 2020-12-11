import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import * as Chart from 'chart.js';
import { environment } from 'environments/environment';
import * as moment from 'moment';
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
  public transactionGraphVolumeLabel: any;
  public showBars = false;

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
                  data : []
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
            tooltips: {
                position: "nearest",

                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        return "Amount: " + value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                    }
                } // end callbacks:
              },
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
                      bottom: 25 
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
                           
                          }
                      }
                  ]
              }
          }
      },
      widget3: {
        conversion: {
            value   : 492,
            ofTarget: 13
        },
        chartType : 'bar',
        datasets  : [
            {
                label: 'Conversion',
                data : []
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
            tooltips: {
                position: "nearest",
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        
                          return "Amount: " + value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                      
                    }
                } // end callbacks:
          },
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
                    bottom: 25 
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
                            
                        }
                    }
                ]
            }
        }
    },
      widget4: {
          visits   : {
              value   : 882,
              ofTarget: 9
          },
          chartType: 'bar',
          datasets : [
              {
                  label: 'Visits',
                  data : []
              }
          ],
          labels   : [],
          colors   : [
              {
                  borderColor    : environment.themeColor,
                  backgroundColor: environment.themeColor
              }
          ],
          options  : {
            position: "nearest",
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                          return "Amount: " + value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                      
                    }
                } // end callbacks:
              },
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
                      bottom: 25 
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
                            userCallback: function(value, index, values) {
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value;
                            }
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
                  intersect: false,
                  callbacks: {
                    // this callback is used to create the tooltip label
                    label: function(tooltipItem, data) {
                      // get the data label and data value to display
                      // convert the data value to local string so it uses a comma seperated number
                      var dataLabel = data.datasets[tooltipItem.datasetIndex].label;
                      var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();
            
                      // make this isn't a multi-line label (e.g. [["label 1 - line 1, "line 2, ], [etc...]])
                      if (Chart.helpers.isArray(dataLabel)) {
                        // show value on first line of multiline label
                        // need to clone because we are changing the value
                        dataLabel = dataLabel.slice();
                        dataLabel[0] += value;
                      } else {
                        dataLabel += value;
                      }
            
                      // return the text to display on the tooltip
                      return dataLabel;
                    }

              }
            },
              layout             : {
                  padding: {
                      left : 24,
                      right: 32,
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
                              fontColor: 'rgba(0,0,0,0.54)',
                              min:0
                          }
                      }
                  ],
                  yAxes: [
                      {
                          gridLines: {
                              tickMarkLength: 16
                          },
                          ticks    : {
                            callback: function(value, index, values) {
                                return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                              },
                             // stepSize: 1000
                             min:0
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
   this.componentRef && this.componentRef.destroy();
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
         this.transactionGraphVolumeLabel = res.Response.Volume[0].time.map(x => moment(x).format('MMM D'));
         if(this.dashboardUserStats.GraphViewModel.AvgTransGraph.data.length >= 0 || this.dashboardUserStats.GraphViewModel.AvgTransGraph.data == null ){
            this.widgets.widget2.datasets[0].data =  this.dashboardUserStats.GraphViewModel.TotalTransGraph.data
            this.widgets.widget3.datasets[0].data =  this.dashboardUserStats.GraphViewModel.SuccessfulTransGraph.data
            this.widgets.widget4.datasets[0].data =  this.dashboardUserStats.GraphViewModel.AvgTransGraph.data
            
            this.widgets.widget2.datasets[0].label =  this.dashboardUserStats.GraphViewModel.TotalTransGraph.label
            this.widgets.widget3.datasets[0].label =  this.dashboardUserStats.GraphViewModel.SuccessfulTransGraph.label
            this.widgets.widget4.datasets[0].label =  this.dashboardUserStats.GraphViewModel.AvgTransGraph.label
            
            this.widgets.widget2.labels =  this.dashboardUserStats.GraphViewModel.TotalTransGraph.days
            this.widgets.widget3.labels =  this.dashboardUserStats.GraphViewModel.SuccessfulTransGraph.days
            this.widgets.widget4.labels =  this.dashboardUserStats.GraphViewModel.AvgTransGraph.days
            this.showBars = true;
         }
        
         if(this.dashboardUserStats && this.dashboardUserStats.Transactions
             && this.dashboardUserStats.Transactions.length){
            this.renderingComponent(TransactionTableComponent, {
              transaction: this.dashboardUserStats.Transactions,
              hideCol: true
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