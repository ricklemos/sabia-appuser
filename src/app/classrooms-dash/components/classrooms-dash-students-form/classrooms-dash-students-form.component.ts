import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClFieldConfig } from 'collact-components';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsForm } from '../../models/classrooms-dash-forms';

@Component({
  selector: 'classrooms-dash-students-form',
  templateUrl: './classrooms-dash-students-form.component.html',
  styleUrls: ['../../../../assets/styles/classrooms-dash.scss']
})
export class ClassroomsDashStudentsFormComponent implements OnInit {
  @Input() title = 'Alunos';
  @Output() formDone: EventEmitter<any> = new EventEmitter<any>();

  students: string[] = [];
  validStudents = false;
  addDisabled = true;
  textStudents: string[] = [];
  formStudents: ClFieldConfig[] = StudentsForm;

  constructor(
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  getCSV($event): void {
    const files = $event.target.files;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (() => {
        const csv: string = reader.result as string;
        const newStudents = csv.split('\n');
        let err = false;
        newStudents.forEach((student) => {
          if (emailRegex.test(student)) {
            this.students.indexOf(student) === -1 ? this.students.push(student) : this.matSnackBar.open('Um ou mais e-mails já foram adicionados', 'OK', { duration: 5000 });
          } else {
            err = true;
          }
        });
        if (err) {
          this.matSnackBar.open('Há um ou mais e-mails incorretos', 'OK', { duration: 5000 });
        }
        if (this.students.length > 0) {
          this.formDone.emit(this.students);
        }
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
    let err = false;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.textStudents.forEach((student) => {
      if (emailRegex.test(student)) {
        this.students.indexOf(student) === -1 ? this.students.push(student) : this.matSnackBar.open('Um ou mais e-mails já foram adicionados', 'OK', { duration: 5000 });
      } else {
        err = true;
      }
    });
    if (err) {
      this.matSnackBar.open('Há um ou mais e-mails incorretos', 'OK', { duration: 5000 });
    } else {
      this.textStudents = [];
    }
    if (this.students.length > 0) {
      this.formDone.emit(this.students);
    }
  }

}
