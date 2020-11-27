import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { snackBarConfig } from 'constants/globalFunctions';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.scss']
})
export class PartnerCreateComponent implements OnInit {


     /**
     * Constructor
     *
     * @param {PartnerService} _partnerService
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
    
    constructor(
      private readonly _partnerService: PartnerService,
      private readonly _snackBar: MatSnackBar,
      private readonly _router: Router,
      private _slidingPanelService:SlidingPanelService
    ) { }
  
    ngOnInit(): void {}
  
    createPartner(event: any){
      this._partnerService.savePartner(event)
      .then((res: any) => {
        if(res && !res.StatusCode){
          
          this._snackBar.open('Partner created', '', snackBarConfig);
          this.closeSlidingPanel();
          this._slidingPanelService.setSlidingPanelStatus(true);

        }
    }).catch((err: HttpErrorResponse)=>(console.log))
    
    }
    closeSlidingPanel(): void {
      
      this._slidingPanelService.closeSlidingPanel('slidePanel').toggleOpen();
    }

}
