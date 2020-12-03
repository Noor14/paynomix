import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { PartnerService } from 'app/main/pages/partner/partner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlgTableComponent } from './plg-table/plg-table.component';


@Component({
  selector: 'app-plg-management',
  templateUrl: './plg-management.component.html',
  styleUrls: ['./plg-management.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class PlgManagementComponent implements OnInit {
  public plgManagmentForm : FormGroup;
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public partners: any[] = [];
  private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {PartnerService} _partnerService
      * @param {UserConfigService} _userConfigService
      * @param {ComponentFactoryResolver} _resolver
     */
    constructor(  private readonly _partnerService: PartnerService,
      private readonly _userConfigService: UserConfigService,
     private readonly _resolver: ComponentFactoryResolver,
      private readonly _formBuilder: FormBuilder

  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.getPartners())
    this.createPlgManagementForm();
  }
  renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
}
  
createPlgManagementForm(): void{
  this.plgManagmentForm = this._formBuilder.group({
   
    PartnerName: [''], 
    WebsiteUrl: [''],
    ThemeColor:[''],
    primaryBackground:[''],
    secondaryBackground:[''],
    Toolbar:['']
});

}
getPartners(): void{
  this._partnerService.partnerList(this._userConfigService.getUserMode())
  .then((res: any) => {
    if(res && !res.StatusCode){
      if(res.Response && res.Response.length){
        this.partners = res.Response;
        this.renderingComponent(PlgTableComponent,{
          partners: this.partners,
        })
      }else{
        this.renderingComponent(NoFoundComponent, {
          icon: 'no-pricing-plan',
          text: 'No partner found',
          subText: "You Haven't made any Partner yet"
        });
      }
    }
  }).catch((err: HttpErrorResponse)=>(console.log))
}

}
