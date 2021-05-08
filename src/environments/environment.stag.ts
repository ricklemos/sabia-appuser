declare function require(moduleName: any): any;
export const environment = {
  production: false,
  prefix: 'stag',
  apiUrl: '',
  baseUrl: '',
  version: require('../../package.json').version,
  build: require('../../package.json').build,
  firebaseConfig: {
    apiKey: "AIzaSyDPBGUz1OUUDuZ9tEK28ALTE8697s79foM",
    authDomain: "fpgr-tcc.firebaseapp.com",
    projectId: "fpgr-tcc",
    storageBucket: "fpgr-tcc.appspot.com",
    messagingSenderId: "456482136613",
    appId: "1:456482136613:web:1311813644a656750295cc"
  }
};
