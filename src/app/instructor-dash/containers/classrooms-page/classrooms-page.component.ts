import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'classrooms-page',
  templateUrl: './classrooms-page.component.html',
  styleUrls: ['./classrooms-page.component.scss']
})
export class ClassroomsPageComponent implements OnInit {

  students: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  getCSV($event): void{
    const files = $event.target.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = ((e) => {
        const csv: string = reader.result as string;
        // TODO: Show error message if CSV is wrong
        this.students = csv.split('\n');
        console.log(this.students);
      });
    }
  }

  uploadClassroom(): void {

  }
}
