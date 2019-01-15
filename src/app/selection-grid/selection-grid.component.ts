import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject} from 'rxjs';
import { ColumnDefinition } from './ColumnDefinition';

@Component({
  selector: 'selection-grid',
  templateUrl: './selection-grid.component.html',
  styleUrls: ['./selection-grid.component.css']
})
export class SelectionGridComponent implements OnInit, AfterViewInit {

  @ViewChild('selectionTable') sortLeft: MatSort;
  @ViewChild('availableTable') sortRight: MatSort;
  
  constructor() {}
  
  ngOnInit(): void {
    this.dsSelection = new MatTableDataSource(this.selectionList.getValue());
    this.dsAvailable = new MatTableDataSource(this.availableList.getValue());

    this.dsSelection.sort = this.sortLeft;
    this.dsAvailable.sort = this.sortRight;
  }
  
  ngAfterViewInit(): void {
    // this.dsSelection.sort = this.sortLeft;
    // this.dsAvailable.sort = this.sortRight;
  }

  @Input()
  public disableSort: Boolean = false;

  @Input()
  public selectionList:BehaviorSubject<any[]>;
  
  @Input()
  public availableList:BehaviorSubject<any[]>;

  private dsSelection:MatTableDataSource<any>;
  private dsAvailable:MatTableDataSource<any>;

  @Input()
  public selectionColumnDef?: ColumnDefinition[] = [{columnDef: 'name', header: 'Name', cell: (row: any) => `${row.name}`, disableSort: false}];
  public availableColumnDef?: ColumnDefinition[] = [{columnDef: 'name', header: 'Name', cell: (row: any) => `${row.name}`, disableSort: false}];
  
  private selectionDisplayedColumns(): string[] {
     return this.selectionColumnDef.map(x => x.columnDef);
  };

  private availableDisplayedColumns(): string[] {
    return this.availableColumnDef.map(x => x.columnDef);
  };

  getDisableSort(column:any): Boolean {
    if (column.hasOwnProperty('disableSort')) {
      return column['disableSort'];
    }
    return this.disableSort;
  }
  drop(event: CdkDragDrop<any[]>) {
     
    const previousIndex = event.previousContainer.data.findIndex(i => (event.item.data === i));

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        previousIndex,
                        event.currentIndex);
    }
    this.dsSelection._updateChangeSubscription();
    this.dsAvailable._updateChangeSubscription();
  }
}