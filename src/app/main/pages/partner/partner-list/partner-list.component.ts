import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerTableComponent } from '../partner-table/partner-table.component';
import { PartnerService } from '../partner.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../constants/globalFunctions';


@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public partners: any[] = [];
  private _unsubscribeAll: Subject<any>;
  public partnerSearchForm: FormGroup;
  public globalConfig = globalConfig;
  
      /**
      * Constructor
      *
      * @param {PartnerService} _partnerService
      * @param {UserConfigService} _userConfigService
      * @param {ComponentFactoryResolver} _resolver
      * @param {SlidingPanelService} _slidingPanelService
      */
     
     constructor(
       private readonly _formBuilder: FormBuilder,
       private readonly _partnerService: PartnerService,
       private readonly _userConfigService: UserConfigService,
       private readonly _resolver: ComponentFactoryResolver,
       private readonly _slidingPanelService: SlidingPanelService,

   ) { 
             // Set the private defaults
             this._unsubscribeAll = new Subject();
   }
  
    ngOnInit(): void {
      this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.getPartners());

      const panelChangesSubscriber = this._slidingPanelService.panelChange.subscribe((res:any)=> {
      if(res) {
        this.getPartners();
        // this._slidingPanelService.setSlidingPanelStatus(false);
        // panelChangesSubscriber && panelChangesSubscriber.unsubscribe();
      }
      })
      this.partnerSearchForm = this._formBuilder.group({
         PartnerName: [''],
         DBAName: [''],
         Email: [''],
        });
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

    getPartners(): void{
      this._partnerService.partnerList(this._userConfigService.getUserMode())
      .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
            this.partners = res.Response;
            this.renderingComponent(PartnerTableComponent,{
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

    openSlidePanel(): void{
     
        this._slidingPanelService.getSidebar('slidePanel', 'PartnerCreateComponent').toggleOpen();
    }

    search(){

      var searchParam = {'PartnerName':'','DBAName':'','Email':''};
      if(this.partnerSearchForm.value.PartnerName!='')
      {
        searchParam.PartnerName =this.partnerSearchForm.value.PartnerName; 
      }
      else
      {
        delete searchParam.PartnerName;
      }
      if(this.partnerSearchForm.value.DBAName!='')
      {
        searchParam.DBAName =this.partnerSearchForm.value.DBAName; 
      }
      else
      {
        delete searchParam.DBAName;
      }
      if(this.partnerSearchForm.value.Email!='')
      {
        searchParam.Email =this.partnerSearchForm.value.Email; 
      }
      else
      {
        delete searchParam.Email;
      }
      
      this._partnerService.partnerList(searchParam)
      .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
            this.partners = res.Response;
            this.renderingComponent(PartnerTableComponent,{
              partners: this.partners,
            })
          }else{
            this.renderingComponent(NoFoundComponent, {
              icon: 'no-pricing-plan',
              text: 'No partner found',
              subText: "You haven't made any Partner"
            });
          }
        }
      }).catch((err: HttpErrorResponse)=>(console.log))
    }

    stopPropagation($event){
      if($event.toElement.textContent !== " Search "){
        $event.stopPropagation();
      }
      
    }

}
