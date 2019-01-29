import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from './selection-grid/ColumnDefinition';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'material-quill';

  myGroup: FormGroup;
  
  selectionColumnDef: ColumnDefinition[] = [
    {columnDef: 'name', header: 'Name', cell: (row: any) => `${row.name}`, disableSort: false},
    {columnDef: 'weight', header: 'Weight', cell: (row: any) => `${row.weight}`, disableSort: false}
  ];

  ELEMENT_DATA: number[] = [
    7,
    8,
    9,
    10
  ];
  
  ELEMENT_DATA2: number[] = [
    1,
    2,
    3,
    4,
    5 
  ];

  ELEMENT_DATA_All: PeriodicElement[] = [
    {id:7, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {id:8, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {id:9, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {id:10, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {id:1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {id:2, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {id:3, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {id:4, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {id:5, position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  
  ];

  selectionList:BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.ELEMENT_DATA);
  availableList:BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.ELEMENT_DATA2);
  dataProvider:BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>(this.ELEMENT_DATA_All);

  dsSelection: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA_All);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
     this.myGroup = new FormGroup({
      control: new FormControl()
    });
  }

  ngOnInit() {
    this.dsSelection.paginator = this.paginator;
  }

  getJson() {
    return JSON.stringify(this.selectionList.getValue());
  }
}

export interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}