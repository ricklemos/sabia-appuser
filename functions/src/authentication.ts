import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// const region = 'southamerica-east1';
const region = 'us-central1';

async function createUserWallet(userId: string): Promise<any> {
  return admin.firestore().collection('simulatorWallet').doc(userId).create({
    balance: 100000,
    privateFixedIncomeEvents: [],
    publicFixedIncomeEvents: [],
    stocksEvents: [],
    userId
  });
}

// Essa função atribui o papel de estudante para todos os novos usuários
export const setStudentRoleOnCreateAndCreateWallet = functions.region(region)
  .auth.user().onCreate((user) => {
    const p1 = createUserWallet(user.uid);
    const p2 = admin.auth().setCustomUserClaims(user.uid, {
      role: 'STUDENT'
    });
    return Promise.all([p1, p2]);
});

// Essa função atribui o papel enviado pela rquisição para o email enviado pela requisição se o usuário tiver o correto privilégio.
export const setRole = functions.region(region).https.onCall((data, context) => {
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

export const setRoleOnUpdateUsers = functions.region(region).firestore
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
