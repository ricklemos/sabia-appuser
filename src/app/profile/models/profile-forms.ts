import { Validators } from '@angular/forms';
import { ValidatorEmail } from '../../forms/validators/validator-email';

export const UserProfileForm = [
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
  },
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
  },
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
  },
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
