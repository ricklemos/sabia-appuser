import { Validators } from '@angular/forms';
import { ValidatorEmail } from '../../forms/validators/validator-email';
import { ValidatorMin } from '../../forms/validators/validator-min';

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
    label: 'Nome',
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
    label: 'Sobrenome',
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
    inputType: 'radio',
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

export const ChangePasswordForm = [
  {
    label: 'Senha atual',
    type: 'password',
    placeholder: '',
    name: 'oldPassword',
    value: '',
    mask: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      },
      {
        name: 'minValue',
        validator: ValidatorMin.validator(6, 'letters'),
        message: 'Min. 6 caracteres'
      }
    ]
  },
  {
    label: 'Nova senha',
    type: 'password',
    placeholder: '',
    name: 'newPassword',
    value: '',
    mask: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      },
      {
        name: 'minValue',
        validator: ValidatorMin.validator(6, 'letters'),
        message: 'Min. 6 caracteres'
      }
    ]
  },
  {
    label: 'Confirme a nova senha',
    type: 'password',
    placeholder: '',
    name: 'repeatNewPassword',
    value: '',
    mask: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O campo é obrigatório'
      },
      {
        name: 'minValue',
        validator: ValidatorMin.validator(6, 'letters'),
        message: 'Min. 6 caracteres'
      }
    ]
  }

];