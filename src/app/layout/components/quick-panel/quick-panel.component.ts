import { Component, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
@Component({
    selector     : 'quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent
{
    public date;


    /**
     * Constructor
     */
    constructor()
    {
        // Set the defaults
        this.date = moment();
    
    }
}
