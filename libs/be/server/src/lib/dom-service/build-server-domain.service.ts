// import { injectable } from 'tsyringe';

// import { ServerDomainModel } from '../model/domain/server-domain.model';
// import { envVariableNotSetMsg } from '../const/message.const';
// import { RouteDtoModel } from '../model/dto/route-dto.model';
// import {
//   ControllerDomainModel,
//   RoutesDomainModel,
// } from '../model/domain/routes-domain.model';

// @injectable()
// export class BuildServerDomainService {
//   build(): ServerDomainModel {
//     return {
//       routes: this.buildRoutes(),
//       socketIO: this.buildSocketIO(),
//     };
//   }

//   private buildRoutes(): RoutesDomainModel {
//     return Object.keys(process.env)
//       .filter((env) => env.startsWith('SERVER_ROUTE_'))
//       .map((env) => process.env[env])
//       .filter((env) => env !== undefined)
//       .map((env) => JSON.parse(env) as RouteDtoModel)
//       .reduce(
//         (acc, curr) => {
//           const { method, url, controller } = curr;
//           if (!acc.methods[method]) {
//             acc.methods[method] = {
//               urls: {},
//             };
//           }
//           acc.methods[method].urls[url] = { controller };
//           return acc;
//         },
//         <RoutesDomainModel>{
//           methods: {},
//         }
//       );
//   }
// }
