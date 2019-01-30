import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Renderer2, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators  } from '@angular/forms';

export const VALUE_ACCESSOR : any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectNameComponent),
  multi: true,
};

@Component({
  selector: 'project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.css'],
  providers: [VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNameComponent implements ControlValueAccessor  {
  
  @Input()
  maxLength: number = 100;

  @Input()
  value?: String;

  
  private _enableVaidation: Boolean = true;

  @Input()
  public set enableVaidation(enable: String) {
    this._enableVaidation = enable != 'false';
    if (this._enableVaidation){
      this.nameTextInput.setValidators([Validators.required, Validators.maxLength(this.maxLength)]);
    }
    else {
      this.nameTextInput.setValidators(null);
    }
    this.nameTextInput.updateValueAndValidity();
  }

  @ViewChild('control') control;

  nameTextInput = new FormControl(this.value ? this.value : '');

  onChange: (_: any) => void;
  onTouched: (_: any) => void;
  
  writeValue(value: any): void {
    const input = this.control.nativeElement;
    this.renderer.setProperty(input, 'value', value);
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onChange = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  
  constructor(private renderer: Renderer2 ) {

  }

  change( $event ) {
    this.onChange($event.target.value);
    this.onTouched($event.target.value);
  }

  getErrorMessage(): String {
    if (this.nameTextInput.hasError('required'))
      return 'Eingabe erforderlich';
    if (this.nameTextInput.hasError('maxlength'))
      return 'Eingabe maximal ' + this.maxLength;

    return '';
  }
}
