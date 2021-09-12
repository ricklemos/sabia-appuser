import { Validators } from '@angular/forms';
import { ValidatorEmail } from '../../forms/validators/validator-email';

export const UserFormEmail = [
  {
    label: 'E-mail',
    type: 'input',
    placeholder: '',
    name: 'email',
    value: '',
    mask: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      },
      {
        name: 'validateEmail',
        validator: ValidatorEmail.validator,
        message: 'E-mail inválido'
      }
    ]
  }
];
