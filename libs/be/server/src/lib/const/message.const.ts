export const methodNotImplementedMsg = 'The method is not implemented!';

export const envVarNotSetMsg = (env: string) =>
  `The ${env} environment variable not set!`;

export const routesNotSetMsg = (errors: string[]) =>
  `Routes not set:\n${errors.join('\n')}`;

export const routeNotPropertySetMsg = (id: string, property: string) =>
  `Route ${id} does not have the ${property} property set.`;

export const buildServerDomainErrorMsg =
  'An error occurred while building the server domain model.';

export const serverIsRunningMsg = 'Server is running...';

export const notSupportedServerType = (serverType: string) =>
  `Not supported server type: ${serverType}`;
