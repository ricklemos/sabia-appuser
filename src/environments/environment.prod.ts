declare function require(moduleName: any): any;

export const environment = {
  production: true,
  prefix: 'prod',
  apiUrl: '',
  baseUrl: '',
  version: require('../../package.json').version,
  build: require('../../package.json').build,
  firebaseConfig: {
    apiKey: 'AIzaSyCRih45Esxu-1A2DdUXXBqjBZj4kMfD5DA',
    authDomain: 'sabia-app-user.firebaseapp.com',
    projectId: 'sabia-app-user',
    storageBucket: 'sabia-app-user.appspot.com',
    messagingSenderId: '685552252667',
    appId: '1:685552252667:web:d1bdbf07dd6027665de25e',
    measurementId: 'G-9HL9LYQ05S'
  }
};
