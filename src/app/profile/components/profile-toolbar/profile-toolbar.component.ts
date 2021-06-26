import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'profile-toolbar',
  templateUrl: './profile-toolbar.component.html',
  styleUrls: ['./profile-toolbar.component.scss']
})
export class ProfileToolbarComponent implements OnInit {
  @Input() pageName: string;

  constructor(
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
