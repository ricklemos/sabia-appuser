import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsSignupService {
  nextStepObservable: Subject<NextStepObservable> = new Subject<NextStepObservable>();

  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  password: string;

  constructor() { }

  public getNextStep(): Observable<NextStepObservable> {
    return this.nextStepObservable.asObservable();
  }

  public nextStep(step: NextStep['step'], data?): void {
    if (data) {
      this.nextStepObservable.next({step, data});
      return;
    }
    this.nextStepObservable.next({step});
  }
}

export interface NextStepObservable {
  data?: any;
  step: NextStep['step'];
}

export interface NextStep {
  step: 'FIRST_NAME' | 'LAST_NAME' | 'GENDER' | 'PASSWORD';
}
