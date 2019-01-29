import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChange, Output, forwardRef, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject} from 'rxjs';
import { ColumnDefinition } from './ColumnDefinition';

@Component({
  selector: 'selection-grid',
  templateUrl: './selection-grid.component.html',
  styleUrls: ['./selection-grid.component.css']
})
export class SelectionGridComponent implements OnInit, AfterViewInit, OnChanges {
  

  @ViewChild('selectionTable') sortLeft: MatSort;
  @ViewChild('availableTable') sortRight: MatSort;
  
  @ViewChild('pagAvailable') pagAvailable: MatPaginator;
  @ViewChild('pagSelection') pagSelection: MatPaginator;
  
  constructor() {}
  
  ngOnInit(): void {
    this.dsSelection = new MatTableDataSource(this.selectionList.getValue());
    this.dsAvailable = new MatTableDataSource(this._availableList.getValue());

    this.dsSelection.sort = this.sortLeft;
    this.dsAvailable.sort = this.sortRight;
  }
  
  ngAfterViewInit(): void {
    this.sortFunction();
    this.dsAvailable.paginator = this.pagAvailable;
    this.dsSelection.paginator = this.pagSelection;

    // this.dsSelection.sort = this.sortLeft;
    // this.dsAvailable.sort = this.sortRight;
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      
      if (propName == 'dataProvider') {
        this._dataProviderMap = new Map<number, any>()
        this.dataProvider.getValue().forEach(item => {
          this._dataProviderMap.set(item[this.dataField],item);
        });

        if (this.selectionList) {
          this.buildAvailableList();
        }
      }
      if (propName == 'selectionList') {
        if (this._dataProviderMap) {
          this.buildAvailableList();
        }
      }
//    console.log(JSON.stringify(changedProp));
    }
  
  }
  
  private buildAvailableList() {
    const arr: number[] = [];

    this.dataProvider.getValue().forEach(item => {
      if (!this.selectionList.getValue().includes(item.id)) {
        arr.push(item.id);
      }
    })

    this._availableList = new BehaviorSubject<number[]>(arr);
  }

  private _dataProviderMap:Map<number, any>;

  @Input()
  public dataField: string = "id";

  private _dataProvider: BehaviorSubject<any[]>;
  public get dataProvider(): BehaviorSubject<any[]> {
    return this._dataProvider;
  }
  @Input()
  public set dataProvider(value: BehaviorSubject<any[]>) {
    if (this._dataProvider === value) {
      return;
    }
    this._dataProvider = value;
    
  }

  @Output()
  selectionListChange = new EventEmitter<BehaviorSubject<any[]>>();
  @Input()
  public disableSort: Boolean = false;

  @Input()
  public includePaginator: Boolean = false;
  
  private _selectionList: BehaviorSubject<any[]>;
  public get selectionList(): BehaviorSubject<any[]> {
    return this._selectionList;
  }
  @Input()
  public set selectionList(value: BehaviorSubject<any[]>) {
    this._selectionList = value;
  }
  
  private _availableList: BehaviorSubject<any[]>;

  @Input()
  public selectionColumnDef?: ColumnDefinition[] = [{columnDef: 'name', header: 'Name', cell: (row: any) => `${row.name}`, disableSort: false}];
  public availableColumnDef?: ColumnDefinition[] = [{columnDef: 'name', header: 'Name', cell: (row: any) => `${row.name}`, disableSort: false}];

  private dsSelection:MatTableDataSource<any>;
  private dsAvailable:MatTableDataSource<any>;

  private selectionDisplayedColumns(): string[] {
     return this.selectionColumnDef.map(x => x.columnDef);
  };

  private availableDisplayedColumns(): string[] {
    return this.availableColumnDef.map(x => x.columnDef);
  };
  
  private getColumnDescription(column:any, row:any): string {
    //return this._dataProviderMap.get(row[this.dataField])[column.columnDef];
    return this._dataProviderMap.get(row)[column.columnDef];
  }

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
    this.selectionListChange.emit(this.selectionList);
  }

  sortFunction() {
    this.dsSelection.sortingDataAccessor = (item, property) => {

      return this._dataProviderMap.get(item)[property];
    }
  }
}