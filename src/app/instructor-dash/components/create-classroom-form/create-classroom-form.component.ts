import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClFieldConfig } from 'collact-components';
import { CreateNewClassroomService } from '../../services/create-new-classroom.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';

@Component({
  selector: 'create-classroom-form',
  templateUrl: './create-classroom-form.component.html',
  styleUrls: ['./create-classroom-form.component.scss']
})
export class CreateClassroomFormComponent implements OnInit {

  @Output() formDone: EventEmitter<any> = new EventEmitter<any>();

  loading = true;
  submitDisabled = false;
  courseOptions = [];
  formCourse: ClFieldConfig[] = [
    {
      type: 'input',
      inputType: 'text',
      label: 'Nome da turma',
      name: 'classroomName',
      value: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'O campo é obrigatório'
        },
      ]
    },
    {
      type: 'select',
      label: 'Curso',
      name: 'course',
      value: '',
      options: this.courseOptions,
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'O curso é obrigatório'
        }
      ]
    },
  ];

  newClassroom: InstructorDashClassroom = {
    classroomName: '',
    classroomId: '',
    courseId: '',
    courseName: '',
    institutionName: '',
    modules: [],
    students: [],
    startDate: new Date()
  };
  courses = [];

  constructor(
    private createNewClassroomService: CreateNewClassroomService
  ) {
  }

  ngOnInit(): void {
    this.createNewClassroomService.fetchCoursesTemplate('BTC').pipe(
      tap((query) => {
        query.forEach((course) => {
          this.courses.push(course);
          this.courseOptions.push({
            value: course.courseId,
            label: course.courseName
          });
          console.log('fetchedCourses', this.courses);
        });
      })
    ).subscribe(noop);
  }

  getFormCourseChanges($event): void {
    if ($event.classroomName) {
      this.newClassroom.classroomName = $event.classroomName;
    }
    if ($event.course) {
      const [course] = this.courses.filter(fetchedCourse => fetchedCourse.courseId === $event.course);
      this.newClassroom.courseId = course.courseId;
      this.newClassroom.courseName = course.courseName;
      this.newClassroom.institutionName = course.institutionName;
      this.newClassroom.modules = course.modules;
    }
  }

  checkIfFormIsValid($event): void {
    this.submitDisabled = $event ? false : true;
    if ($event) {
      this.formDone.emit(this.newClassroom);
    }
  }

}
