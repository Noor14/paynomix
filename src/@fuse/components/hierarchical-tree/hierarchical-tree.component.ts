import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { HierarchicalTreeService } from './hierarchical-tree.service';
import { UserConfigService } from '@fuse/services/user.config.service';

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
export class HierarchicalTreeComponent implements OnInit, OnDestroy {

 public treeControl = new NestedTreeControl<Node>(node => node.children);
 public dataSource = new MatTreeNestedDataSource<Node>();
 private hierarchySubscriber: any;

  constructor(
    private readonly _hierarchyService: HierarchicalTreeService,
    private readonly _userConfigService: UserConfigService
  ) {
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  ngOnInit() {
   this.hierarchySubscriber = this._userConfigService.getUserHierarchy.subscribe(res=> {
      if(res){
        this.dataSource.data = res;
      }
    })
  }

  ngOnDestroy(): void{
    this.hierarchySubscriber && this.hierarchySubscriber.unsubscribe();
  }

}
