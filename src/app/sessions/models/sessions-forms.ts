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

export const UserFormFirstName = [
  {
    type: 'input',
    placeholder: 'Primeiro nome',
    name: 'firstName',
    value: '',
    mask: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      }
    ]
  }
];

export const UserFormLastName = [
  {
    type: 'input',
    placeholder: 'Sobrenome',
    name: 'lastName',
    value: '',
    mask: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      }
    ]
  }
];

export const UserFormGender = [
  {
    type: 'chip',
    name: 'gender',
    inputYpe: 'radio',
    value: '',
    options: [
      { label: 'Masculino', value: 'MALE' },
      { label: 'Feminino', value: 'FEMALE' },
      { label: 'Outro', value: 'OTHER' },
    ],
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      }
    ]
  }
];
