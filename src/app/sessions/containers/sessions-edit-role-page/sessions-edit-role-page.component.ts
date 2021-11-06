import { Component, OnInit } from '@angular/core';
import { ClFieldConfig } from 'collact-components';
import {FormControl, Validators} from '@angular/forms';
import { SessionsRolesService } from '../../services/sessions-roles.service';
import {switchMap, tap} from 'rxjs/operators';
import { noop, of} from 'rxjs';
import { SessionsRole } from '../../models/sessions-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StocksService } from '../../../services/stocks.service';

@Component({
  selector: 'sessions-edit-role-page',
  templateUrl: './sessions-edit-role-page.component.html',
  styleUrls: ['./sessions-edit-role-page.component.scss']
})
export class SessionsEditRolePageComponent implements OnInit {

  form: ClFieldConfig[] = [
    {
      type: 'input',
      inputType: 'text',
      label: 'E-mail do usuário',
      name: 'userEmail',
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
      label: 'Papel',
      name: 'role',
      value: '',
      options: [
        { value: 'STUDENT', label: 'Aluno' },
        { value: 'INSTRUCTOR', label: 'Instrutor' },
        { value: 'SCHOOL_ADMIN', label: 'Administrador' },
        { value: 'MASTER', label: 'Master' },
      ],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'O curso é obrigatório'
        }
      ]
    },
  ];

  submitDisabled = true;
  userEmail: string;
  role: SessionsRole;

  results: any;
  searchValue = new FormControl('');
  constructor(
    private sessionsRolesService: SessionsRolesService,
    private matSnackBar: MatSnackBar,
    private stocksService: StocksService,
  ) {

  }

  ngOnInit(): void {
    this.searchValue.valueChanges.pipe(
      switchMap((text) => {
        text = text.toUpperCase();
        console.log('texto a procurar', text);
        if (text !== ''){
          return this.stocksService.searchStocks(text), this.stocksService.searchStocksByName(text);
        } else {
          return of(null), of(null);
        }
      }),
      tap((array) => {
        console.log('r', array);
        this.results = array;
      })
    ).subscribe(noop);
  }

  getFormChanges($event): void {
    if ($event.userEmail) {
     this.userEmail = $event.userEmail;
    }
    if ($event.role) {
      this.role = $event.role;
    }
  }

  checkIfFormIsValid($event): void {
    this.submitDisabled = !$event;
  }
  submit(): void {
    this.sessionsRolesService.updateRole(this.userEmail, this.role).pipe(
      tap((data) => {
        this.matSnackBar.open(data.result, 'OK', { duration: 4000 });
      })
    ).subscribe(noop);
  }

}
