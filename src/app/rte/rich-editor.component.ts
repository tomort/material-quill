import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, Output, EventEmitter, forwardRef, Injector, DoCheck, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import Quill from "quill";


@Component({
  selector: 'rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichEditorComponent),
    multi: true
  },
  {
    provide: MatFormFieldControl,
    useExisting: RichEditorComponent
  }
  ],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
 }
})
export class RichEditorComponent  implements OnInit, DoCheck, ControlValueAccessor, MatFormFieldControl<any> {

  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  
  quill:any;
  
  static nextId = 0;
  @HostBinding() id = `rich-editor-input-${RichEditorComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get required() { return this._required; }
  
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  public _required = false;

  @Input()
  get placeholder() { return this._placeholder;}
  
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  public _placeholder: string;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  public _disabled = false;

  editor: any;
  focused;
  ngControl;
  touched;

  controlType = 'richeditor';

  errorState = false;

  stateChanges = new Subject<void>();
  
  private _value: any;
  
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    this.editor.setContents(this._value);
    this.onChange(value);
    this.stateChanges.next();
  }

  get empty() {
    const commentText = this.editor.getText().trim();
    return commentText ? false : true;
 }

  constructor(public elRef: ElementRef, public injector: Injector, public fm: FocusMonitor) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    let editor = this.container.nativeElement.querySelector('#editor')

    this.editor = new Quill(editor, {theme: 'snow'});
    this.editor.on('editor-change', (eventName, ...args) => {
       this.onChange(this.editor.getContents());
    });
  }



  onChange = (delta: any) => {};
   
  onTouched = () => {
     this.touched = true;
  };

  writeValue(delta: any): void {
     this.editor.setContents(delta);
     this._value = delta;
  }

  registerOnChange(fn: (v: any) => void): void {
     this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'div') {
      this.container.nativeElement.querySelector('div').focus();
    }
  }

  ngOnChanges() {
    if (this.editor) {
      this.editor.setContents(this.value);
    }
  }

  ngDoCheck(): void {
    if(this.ngControl) {
       this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
 }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

}
