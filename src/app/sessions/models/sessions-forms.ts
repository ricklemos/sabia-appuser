import { Validators } from '@angular/forms';
import { ValidatorEmail } from '../../forms/validators/validator-email';
import { ValidatorMin } from '../../forms/validators/validator-min';

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
export const UserFormPassword = [
  {
    label: 'senha',
    type: 'password',
    placeholder: '',
    name: 'password',
    value: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Senha é obrigatória'
      },
      {
        name: 'minValue',
        validator: ValidatorMin.validator(6, 'letters'),
        message: 'Min. 6 caracteres'
      }
    ]
  }
];
