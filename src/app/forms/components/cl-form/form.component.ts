import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ClFieldConfig, ClForm } from 'collact-components';

@Component({
  selector: 'cl-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() formConfig: any;
  @Input() populate: any;
  @Input() theme: string;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();
  @Output() formInstance: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ClForm) form: ClForm;

  formInstanced: boolean;
  regConfig: ClFieldConfig[];

  unsubscribe: Array<any> = [];

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formConfig) {
      this.setConfig();
    }
  }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(): void {
    this.setObservable();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setConfig();
    }, 0);
  }

  setObservable(): void {
    this.removeObservable();
    this.regConfig = null;
    this.regConfig = this.formConfig;
    setTimeout(() => {
      try {
        this.isValid.emit(this.form.form.valid);
        if (this.form && !this.formInstanced) {
          this.formInstance.emit(this.form);
          this.formInstanced = true;
        }

        const formChangesSubscribe = this.form.form.valueChanges.subscribe(
          data => {
            this.isValid.emit(this.form.form.valid);
            this.sendChanges(data);
          }
        );
        this.unsubscribe.push(formChangesSubscribe);
      } catch (e) {
      }

    }, 0);
  }

  removeObservable(): void {
    this.unsubscribe.map(s => {
      s.complete();
      s.unsubscribe();
    });
    this.unsubscribe = [];
  }

  ngOnDestroy(): void {
    this.removeObservable();
  }

  sendChanges(data): void {
    this.changes.emit(data);
  }

  submitForm(data): void {
    this.submit.emit(this.form.form);
  }
}
