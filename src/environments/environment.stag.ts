declare function require(moduleName: any): any;
export const environment = {
  production: false,
  prefix: 'stag',
  apiUrl: '',
  baseUrl: '',
  version: require('../../package.json').version,
  build: require('../../package.json').build
};
