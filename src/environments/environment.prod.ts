declare function require(moduleName: any): any;
export const environment = {
  production: true,
  prefix: 'prod',
  apiUrl: '',
  baseUrl: '',
  version: require('../../package.json').version,
  build: require('../../package.json').build
};
