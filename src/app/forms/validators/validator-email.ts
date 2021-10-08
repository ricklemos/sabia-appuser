import { FormControl } from '@angular/forms';

export class ValidatorEmail {

  static validator(c: FormControl): any {

    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const emailValid = reg.test(c.value);
    if (!c.value) {
      return null;
    }

    if (!emailValid) {
      return { validateEmail: true };
    }
    return null;
  }
}


