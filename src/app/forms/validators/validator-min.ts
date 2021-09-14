import { FormControl } from '@angular/forms';


export class ValidatorMin {

  static validator(min: number, type?): any {
    return (control: FormControl) => {
      const num = control.value;

      if (!num) {
        return null;
      }

      if (type === 'letters') {
        if (num.length < min) {
          return {
            minValue: true
          };
        }
      } else {
        if (num < min) {
          return {
            minValue: true
          };
        }
      }


      return null;
    };
  }

}
