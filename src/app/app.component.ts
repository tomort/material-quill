import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from './selection-grid/ColumnDefinition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'material-quill';

  myGroup: FormGroup;
  
  selectionColumnDef: ColumnDefinition[] = [
    {columnDef: 'name', header: 'Name', cell: (row: any) => `${row.name}`, disableSort: true},
    {columnDef: 'weight', header: 'Weight', cell: (row: any) => `${row.weight}`, disableSort: false}
  ];

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  
  ELEMENT_DATA2: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  
  ];

  selectionList:BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>(this.ELEMENT_DATA);
  availableList:BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>(this.ELEMENT_DATA2);
  
  constructor() {
     this.myGroup = new FormGroup({
      control: new FormControl()
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}