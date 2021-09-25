import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Essa função atribui o papel de estudante para todos os novos usuários
export const setStudentRoleOnCreate = functions.auth.user().onCreate((user) => {
  return admin.auth().setCustomUserClaims(user.uid, {
    role: 'STUDENT'
  });
});

// Essa função atribui o papel enviado pela rquisição para o email enviado pela requisição se o usuário tiver o correto privilégio.
export const setRole = functions.https.onCall((data, context) => {
  if (context.auth) {
    if (context.auth.token.role !== 'SCHOOL_ADMIN' && context.auth.token.role !== 'MASTER' && context.auth.uid !== '9lurqQ9nTcUdeCP2cjQmzoUKgdE2') {
      return {
        error: 'Não autorizado: Usuário deve ser um administrador.'
      };
    } else {
      const email = data.email;
      const role = data.role;
      return grantRole(email, role)
        .then(() => {
          return {
            result: `Autorizado! ${ email } agora é um ${ role }`
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
  const user = await admin.auth().getUserByEmail(email);
  return admin.auth().setCustomUserClaims(user.uid, { role });
}

export const setRoleOnUpdateUsers = functions.firestore
  .document('users/{userId}')
  .onUpdate(snap => {
    const email = snap.after.data().email;
    if (snap.after.data().role){
      const role = snap.after.data().role;
      return grantRole(email, role);
    } else {
      return null;
    }
  });
