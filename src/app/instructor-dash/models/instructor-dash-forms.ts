import { Validators } from '@angular/forms';

export const StudentsForm = [
  {
    type: 'textArea',
    placeholder: 'Insira o e-mail dos alunos separando por linha',
    name: 'students',
    value: '',
  }
];

export const CreateClassroomForm = [
  {
    type: 'input',
    inputType: 'text',
    label: 'Nome da turma',
    name: 'classroomName',
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
    label: 'Curso',
    name: 'course',
    value: '',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'O curso é obrigatório'
      }
    ]
  },
];
