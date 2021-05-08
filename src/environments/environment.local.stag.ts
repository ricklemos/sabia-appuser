declare function require(moduleName: any): any;
export const environment = {
  production: false,
  prefix: 'stag',
  apiUrl: '',
  baseUrl: 'http://localhost:4200',
  version: require('../../package.json').version,
  build: require('../../package.json').build
};
