import { Component, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  constructor(private modifyUserDataService: ModifyUserDataService) { }

  ngOnInit(): void {
  }
  test(): void{
    this.modifyUserDataService.editFirstName('Gabs');
    this.modifyUserDataService.editLastName('Duarte');
    this.modifyUserDataService.editGender('m');
    this.modifyUserDataService.editEmail('gmduarte96@gmail.com');
  }

}
