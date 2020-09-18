import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { snackBarConfig } from 'constants/globalFunctions';
import { ResellerService } from '../reseller.service';

@Component({
  selector: 'app-reseller-create',
  templateUrl: './reseller-create.component.html',
  styleUrls: ['./reseller-create.component.scss']
})
export class ResellerCreateComponent implements OnInit {


     /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
    
  constructor(
    private readonly _resellerService: ResellerService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {}

  createReseller(event: any){
    this._resellerService.saveReseller(event)
    .then((res: any) => {
      if(res && !res.StatusCode){
        this._snackBar.open('Reseller created', '', snackBarConfig);
        this._router.navigate(['/pages/reseller/reseller-list']);

      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  
  }
}
