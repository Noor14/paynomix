import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { UserConfigService } from '@fuse/services/user.config.service';
import { MatMenuTrigger } from '@angular/material/menu';

interface Node {
  title: string;
  children?: Node[];
}
@Component({
  selector: 'app-hierarchical-tree',
  templateUrl: './hierarchical-tree.component.html',
  styleUrls: ['./hierarchical-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HierarchicalTreeComponent implements OnInit, OnDestroy, OnChanges{
@ViewChild(MatMenuTrigger, {static: false}) triggerMenu: MatMenuTrigger;
@Input() toggleHierarchy: boolean = false;
@Output() menuToggle = new EventEmitter<boolean>()
 public selectedNode: any = {};
 public treeControl = new NestedTreeControl<Node>(node => node.children);
 public dataSource = new MatTreeNestedDataSource<Node>();
 private hierarchySubscriber: any;

  constructor(
    private readonly _userConfigService: UserConfigService
  ) {
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  ngOnInit() {
   this.hierarchySubscriber = this._userConfigService.getUserHierarchy.subscribe(res=> {
      if(res){
        this.dataSource.data = res;
        this.selectedNode = res[0];
      }
    })
  }
  ngOnChanges(){
      if(this.toggleHierarchy){
        this.triggerMenu.openMenu();
      }
  }
  menuClosed(){
    this.menuToggle.emit(false);
  }
  ngOnDestroy(): void{
    this.hierarchySubscriber && this.hierarchySubscriber.unsubscribe();
  }
  selectUserMode(node): void{
    this.selectedNode = node;
    this.triggerMenu.closeMenu();
    let obj:any = {};
    if(this.selectedNode.hasOwnProperty('locationid')){
      obj.LocationId = this.selectedNode.locationid;
    }else if(this.selectedNode.hasOwnProperty('merchantid')){
      obj.MerchantId = this.selectedNode.merchantid;
    }
    else if(this.selectedNode.hasOwnProperty('resellerid')){
      obj.ResellerId = this.selectedNode.resellerid;
    }else{
      if(this.selectedNode.partnerid > 1 ){
        obj.PartnerId = this.selectedNode.partnerid;
      } else{
        obj = null;
      }

    }

    this._userConfigService.setUserMode(obj);
  }

}
