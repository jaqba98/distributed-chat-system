export const methodNotImplementedMsg = 'The method is not implemented!';

export const envVarNotSetMsg = (env: string) =>
  `The ${env} environment variable not set!`;

export const routeNotPropertySetMsg = (id: string, property: string) =>
  `Route ${id} does not have the ${property} property set.`;
