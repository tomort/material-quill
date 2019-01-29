import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatFormFieldModule, MatTableModule, MatSortModule, MatPaginator, MatPaginatorModule, MatDividerModule } from '@angular/material';
import { RichEditorComponent } from './rte/rich-editor.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SelectionGridComponent } from './selection-grid/selection-grid.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from "@angular/flex-layout";
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    RichEditorComponent,
    SelectionGridComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    CdkTableModule,
    DragDropModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
