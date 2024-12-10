export const envNotSetMsg = (env: string) =>
  `You did not set the ${env} environment variable`;

export const envNotCorrectValueMsg = (
  env: string,
  val: string,
  possible: string
) =>
  `The ${env} environment variable has not supported value ${val}, possible values: ${possible}`;

export const httpRouteNotPropertySetMsg = (id: string, property: string) =>
  `Route ${id} does not have the ${property} property set!`;

export const envVarNotSetMsg = (env: string) =>
  `The ${env} environment variable not set!`;

export const methodNotImplementedMsg = 'The method is not implemented!';

export const routesNotSetMsg = (errors: string[]) =>
  `Routes not set:\n${errors.join('\n')}`;

export const buildServerDomainErrorMsg =
  'An error occurred while building the server domain model.';

export const serverIsRunningMsg = 'Server is running...';

export const notSupportedServerType = (serverType: string) =>
  `Not supported server type: ${serverType}`;

export const databaseReadyMsg = 'Database is ready!';

export const databaseNotReadyMsg = 'Waiting for database...';
