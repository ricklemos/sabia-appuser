import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClFieldConfig } from 'collact-components';
import { ClassroomsDashCreateNewClassroomService } from '../../services/classrooms-dash-create-new-classroom.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ClassroomsDashClassroom } from '../../models/classrooms-dash-models';
import { CreateClassroomForm } from '../../models/classrooms-dash-forms';

@Component({
  selector: 'classrooms-dash-create-classroom-form',
  templateUrl: './classrooms-dash-create-classroom-form.component.html',
  styleUrls: ['../../../../assets/styles/classrooms-dash.scss']
})
export class ClassroomsDashCreateClassroomFormComponent implements OnInit {

  @Output() formDone: EventEmitter<any> = new EventEmitter<any>();

  loading = true;
  submitDisabled = false;
  courseOptions = [];
  formCourse: ClFieldConfig[] = CreateClassroomForm;
  newClassroom: ClassroomsDashClassroom = {
    classroomName: '',
    classroomId: '',
    courseId: '',
    courseName: '',
    institutionName: '',
    modules: [],
    students: [],
    startDate: new Date(),
    courseDescription: '',
    courseLink: ''
  };
  courses = [];

  constructor(
    private createNewClassroomService: ClassroomsDashCreateNewClassroomService
  ) {
  }

  ngOnInit(): void {
    // TODO: filtrar cursos da forma correta no nome da instituição
    this.createNewClassroomService.fetchCoursesTemplate('BTC').pipe(
      tap((query) => {
        query.forEach((course) => {
          this.courses.push(course);
          this.courseOptions.push({
            value: course.courseId,
            label: course.courseName
          });
          this.formCourse[1].options = this.courseOptions;
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
      this.newClassroom.courseDescription = course.courseDescription;
      this.newClassroom.courseLink = course.courseLink;
    }
  }

  checkIfFormIsValid($event): void {
    this.submitDisabled = !$event;
    if ($event) {
      this.formDone.emit(this.newClassroom);
    }
  }

}
