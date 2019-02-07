import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TestModel } from './test-model';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'test-from',
  templateUrl: './test-from.component.html',
  styleUrls: ['./test-from.component.css'],
  providers: [TestModel]
})
export class TestFromComponent implements OnInit, OnChanges {

  testForm: FormGroup;

  constructor(private fb: FormBuilder, private model:TestModel) {
    this.testForm = this.fb.group({
      projectNameField: [this.model.projectName ? this.model.projectName : null],
      checkField: [this.model.enableValidator],
      testInput: ['']
    });

  }

  ngOnInit() {
  }

  get f() { return this.testForm.controls; }

  ngOnChanges(changes: SimpleChanges) {

  }

  onChange(event:MatCheckboxChange) {
    this.model.enableValidator = event.checked;

  }
  
}
