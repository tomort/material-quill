import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TestModel } from './test-model';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'test-from',
  templateUrl: './test-from.component.html',
  styleUrls: ['./test-from.component.css'],
  providers: [TestModel]
})
export class TestFromComponent implements OnInit {

  testForm: FormGroup;

  constructor(private fb: FormBuilder, private model:TestModel) {
    this.testForm = this.fb.group({
      projectNameField: [this.model.projectName ? this.model.projectName : null],
      checkField: [this.model.enableValidator]
    });

  }

  ngOnInit() {
  }

  onChange(event:MatCheckboxChange) {
    this.model.enableValidator = event.checked;

  }
  
}
