import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClFieldConfig } from 'collact-components';

@Component({
  selector: 'students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit {
  @Input() title = 'Alunos';
  @Output() formDone: EventEmitter<any> = new EventEmitter<any>();

  students: string[] = [];
  validStudents = false;
  addDisabled = true;
  textStudents: string[] = [];
  formStudents: ClFieldConfig[] = [
    {
      type: 'textArea',
      placeholder: 'Insira o e-mail dos alunos separando por linha',
      name: 'students',
      value: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'O campo é obrigatório'
        },
      ],
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  getCSV($event): void {
    const files = $event.target.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (() => {
        const csv: string = reader.result as string;
        // TODO: Show error message if CSV is wrong
        this.students = this.students.concat(csv.split('\n'));
        this.formDone.emit(this.students);
      });
    }
  }

  getFormStudentsChanges($event): void {
    if ($event.students) {
      this.textStudents = $event.students.split('\n');
    }
  }

  checkIfFormIsValid($event): void {
    this.validStudents = $event;
    this.addDisabled = !$event;
  }

  addStudentsFromTextarea(): void {
    this.students = this.students.concat(this.textStudents);
    this.textStudents = [];
    this.formDone.emit(this.students);
  }

}
