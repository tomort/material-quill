import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'selection-grid',
  templateUrl: './selection-grid.component.html',
  styleUrls: ['./selection-grid.component.css']
})
export class SelectionGridComponent {
  
  @ViewChild('table1') table1: MatTable<PeriodicElement>;
  @ViewChild('table2') table2: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(this.ELEMENT_DATA2);

    drop(event: CdkDragDrop<PeriodicElement[]>) {
      console.log("event.previousContainer =>", event.previousContainer);
      console.log("event.container =>", event.container)
      console.log("event.container.data =>", event.container.data)
      console.log("event.previousIndex =>", event.previousIndex);
      console.log("event.currentIndex =>", event.currentIndex);
      
      const previousIndex = event.previousContainer.data.findIndex(i => (event.item.data === i));

      if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, previousIndex, event.currentIndex);
    } else {
      

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        previousIndex,
                        event.currentIndex);
    }
    // this.table1.renderRows();
    // this.table2.renderRows();
    //this.dataSource = new MatTableDataSource(this.dataSource.data);
    //this.dataSource2 = new MatTableDataSource(this.dataSource2.data);

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource2 = new MatTableDataSource(this.ELEMENT_DATA2);

  }
}