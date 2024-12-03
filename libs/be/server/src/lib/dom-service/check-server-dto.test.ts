import 'reflect-metadata'; // Required for tsyringe
import { CheckServerDtoService } from './check-server-dto.service';
import { ServerDtoPartialType } from '../model/dto/server-dto.model';
import {
  envVarNotSetMsg,
  routeNotPropertySetMsg,
  routesNotSetMsg,
} from '../const/message.const';
import {
  SERVER_SOCKET_IO,
  SERVER_SOCKET_IO_CONTROLLER,
  SERVER_TYPE,
} from '../const/env.const';

describe('CheckServerDtoService', () => {
  let service: CheckServerDtoService;

  beforeEach(() => {
    service = new CheckServerDtoService();
  });

  describe('check', () => {
    it('should pass when all properties are set correctly', () => {
      const dto: ServerDtoPartialType = {
        serverType: 'http',
        serverRoutes: [
          {
            id: 'route1',
            method: 'GET',
            url: '/',
            controller: 'rootController',
          },
          {
            id: 'route2',
            method: 'POST',
            url: '/submit',
            controller: 'submitController',
          },
        ],
        serverSocketIO: { controller: 'socketIOController' },
      };

      expect(() => service.check(dto)).not.toThrow();
    });

    it('should throw an error when serverType is not set', () => {
      const dto: ServerDtoPartialType = {
        serverType: undefined,
        serverRoutes: [
          {
            id: 'route1',
            method: 'GET',
            url: '/',
            controller: 'rootController',
          },
        ],
        serverSocketIO: { controller: 'socketIOController' },
      };

      expect(() => service.check(dto)).toThrow(
        new Error(envVarNotSetMsg(SERVER_TYPE))
      );
    });

    it('should throw an error when a server route is missing properties', () => {
      const dto: ServerDtoPartialType = {
        serverType: 'http',
        serverRoutes: [
          {
            id: 'route1',
            method: undefined,
            url: '/',
            controller: 'rootController',
          },
          {
            id: 'route2',
            method: 'POST',
            url: undefined,
            controller: 'submitController',
          },
        ],
        serverSocketIO: { controller: 'socketIOController' },
      };

      const expectedError = routesNotSetMsg([
        routeNotPropertySetMsg('route1', 'method'),
        routeNotPropertySetMsg('route2', 'url'),
      ]);

      expect(() => service.check(dto)).toThrow(new Error(expectedError));
    });

    it('should throw an error when serverSocketIO is not set', () => {
      const dto: ServerDtoPartialType = {
        serverType: 'http',
        serverRoutes: [
          {
            id: 'route1',
            method: 'GET',
            url: '/',
            controller: 'rootController',
          },
        ],
        serverSocketIO: undefined,
      };

      expect(() => service.check(dto)).toThrow(
        new Error(envVarNotSetMsg(SERVER_SOCKET_IO))
      );
    });

    it('should throw an error when serverSocketIO controller is not set', () => {
      const dto: ServerDtoPartialType = {
        serverType: 'http',
        serverRoutes: [
          {
            id: 'route1',
            method: 'GET',
            url: '/',
            controller: 'rootController',
          },
        ],
        serverSocketIO: { controller: undefined },
      };

      expect(() => service.check(dto)).toThrow(
        new Error(envVarNotSetMsg(SERVER_SOCKET_IO_CONTROLLER))
      );
    });

    it('should pass when no serverRoutes are defined', () => {
      const dto: ServerDtoPartialType = {
        serverType: 'http',
        serverRoutes: undefined,
        serverSocketIO: { controller: 'socketIOController' },
      };

      expect(() => service.check(dto)).not.toThrow();
    });
  });
});
