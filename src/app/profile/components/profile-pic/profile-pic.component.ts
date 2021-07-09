import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  src;
  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private host: ElementRef<HTMLInputElement>
  ) { }

  ngOnInit(): void {
    this.modifyUserDataService.fetchProfilePic().subscribe(ref => this.src = ref);
  }

  updatePic(event): void{
    const file = event.target.files[0];
    this.modifyUserDataService.updateProfilePic(file);
  }

}
