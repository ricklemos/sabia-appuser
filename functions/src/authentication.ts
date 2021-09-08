import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const setStudentRoleOnCreate = functions.auth.user().onCreate((user) => {
  return admin.auth().setCustomUserClaims(user.uid, {
    role: 'STUDENT'
  });
});

export const setRole = functions.https.onCall((data, context) => {
  // console.log('data', data);
  // console.log('context auth', context.auth);
  if (context.auth){
    if (context.auth.token.role !== 'SCHOOL_ADMIN' && context.auth.token.email !== 'gmduarte96@gmail.com'){
      return {
        error: 'Não autorizado: Usuário deve ser um administrador.'
      };
    } else {
      const email = data.email;
      const role = data.role;
      return grantRole(email, role)
        .then(() => {
          return {
            result: `Autorizado! ${email} agora é um ${role}`
          };
        }).catch((err) => {
          return err;
        });
    }
  } else {
    return {
      error: 'Não autorizado: Falha de autenticação'
    };
  }
});

async function grantRole(email: string, role: string): Promise<void> {
  console.log('chamou o grantRole');
  const user = await admin.auth().getUserByEmail(email);
  return admin.auth().setCustomUserClaims(user.uid, { role });
}
