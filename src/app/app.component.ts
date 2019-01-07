import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-quill';

  myGroup: FormGroup;
  
  constructor() {
     this.myGroup = new FormGroup({
      control: new FormControl()
    });
  }
}
