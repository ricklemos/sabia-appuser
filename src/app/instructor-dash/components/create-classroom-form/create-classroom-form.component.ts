import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClFieldConfig } from 'collact-components';
import { CreateNewClassroomService } from '../../services/create-new-classroom.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';
import { CreateClassroomForm } from '../../models/instructor-dash-forms';

@Component({
  selector: 'create-classroom-form',
  templateUrl: './create-classroom-form.component.html',
  styleUrls: ['../../../../assets/styles/instructor-dash.scss']
})
export class CreateClassroomFormComponent implements OnInit {

  @Output() formDone: EventEmitter<any> = new EventEmitter<any>();

  loading = true;
  submitDisabled = false;
  courseOptions = [];
  formCourse: ClFieldConfig[] = CreateClassroomForm;
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
    this.formCourse[1].options = this.courseOptions;
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
    this.submitDisabled = !$event;
    if ($event) {
      this.formDone.emit(this.newClassroom);
    }
  }

}
