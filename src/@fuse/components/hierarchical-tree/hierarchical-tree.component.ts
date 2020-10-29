import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { HierarchicalTreeService } from './hierarchical-tree.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];
@Component({
  selector: 'app-hierarchical-tree',
  templateUrl: './hierarchical-tree.component.html',
  styleUrls: ['./hierarchical-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HierarchicalTreeComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(
    private readonly _hierarchyService: HierarchicalTreeService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.getHierarchy()
  }
  getHierarchy() {
    this._hierarchyService.getHierarchy()
    .then((res:any) => {
      if(res && !res.StatusCode) {
        this.dataSource.data = res.Response;
      }
    })
  }

}
