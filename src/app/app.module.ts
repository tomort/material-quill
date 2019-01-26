import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { RichEditorComponent } from './rte/rich-editor.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProjectNameComponent } from './commons/attributes/predefined/project/project-name/project-name.component';


@NgModule({
  declarations: [
    AppComponent,
    RichEditorComponent,
    ProjectNameComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
