import 'reflect-metadata';
import { container } from 'tsyringe';

import { BuildServerDtoService } from './build-server-dto.service';
import { ServerDtoModel } from '../model/dto/server-dto.model';

describe('BuildServerDtoService', () => {
  const service = container.resolve(BuildServerDtoService);
  const initProcessEnv = process.env;

  const resetProcessEnv = () => {
    process.env = { ...initProcessEnv };
  };

  beforeEach(() => resetProcessEnv());
  afterAll(() => resetProcessEnv());

  test('should return empty routes and undefined socketIO when no environment variables are set', () => {
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [],
      socketIO: undefined,
    });
  });

  test('should correctly set socketIO when SERVER_SOCKET_IO is defined', () => {
    process.env.SERVER_SOCKET_IO = 'test';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [],
      socketIO: 'test',
    });
  });

  test('should return empty routes when SERVER_ROUTE_TEST is empty', () => {
    process.env.SERVER_ROUTE_TEST = '';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [],
      socketIO: undefined,
    });
  });

  test('should return a single route with undefined properties for invalid JSON string', () => {
    process.env.SERVER_ROUTE_TEST = 'abcd';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST',
          method: undefined,
          url: undefined,
          controller: undefined,
        },
      ],
      socketIO: undefined,
    });
  });

  test('should correctly parse and build a route from a valid JSON string', () => {
    process.env.SERVER_ROUTE_TEST =
      '{"method":"GET","url":"/","controller":"testController"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST',
          method: 'GET',
          url: '/',
          controller: 'testController',
        },
      ],
      socketIO: undefined,
    });
  });

  test('should handle a JSON string with only the method defined', () => {
    process.env.SERVER_ROUTE_TEST = '{"method":"GET"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST',
          method: 'GET',
          url: undefined,
          controller: undefined,
        },
      ],
      socketIO: undefined,
    });
  });

  test('should handle a JSON string with only url and controller defined', () => {
    process.env.SERVER_ROUTE_TEST = '{"url":"/","controller":"testController"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST',
          method: undefined,
          url: '/',
          controller: 'testController',
        },
      ],
      socketIO: undefined,
    });
  });

  test('should correctly handle multiple SERVER_ROUTE_* environment variables', () => {
    process.env.SERVER_ROUTE_TEST_1 =
      '{"method":"GET","url":"/","controller":"controller1"}';
    process.env.SERVER_ROUTE_TEST_2 =
      '{"method":"POST","url":"/test","controller":"controller2"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST_1',
          method: 'GET',
          url: '/',
          controller: 'controller1',
        },
        {
          id: 'SERVER_ROUTE_TEST_2',
          method: 'POST',
          url: '/test',
          controller: 'controller2',
        },
      ],
      socketIO: undefined,
    });
  });

  test('should handle mixed valid and invalid SERVER_ROUTE_* environment variables', () => {
    process.env.SERVER_ROUTE_TEST_1 =
      '{"method":"GET","url":"/","controller":"controller1"}';
    process.env.SERVER_ROUTE_TEST_2 = 'invalid_json';
    process.env.SERVER_ROUTE_TEST_3 =
      '{"method":"POST","url":"/test","controller":"controller2"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST_1',
          method: 'GET',
          url: '/',
          controller: 'controller1',
        },
        {
          id: 'SERVER_ROUTE_TEST_2',
          method: undefined,
          url: undefined,
          controller: undefined,
        },
        {
          id: 'SERVER_ROUTE_TEST_3',
          method: 'POST',
          url: '/test',
          controller: 'controller2',
        },
      ],
      socketIO: undefined,
    });
  });

  test('should ignore environment variables that do not start with SERVER_ROUTE_', () => {
    process.env.SERVER_ROUTE_TEST =
      '{"method":"GET","url":"/","controller":"controller1"}';
    process.env.NOT_SERVER_ROUTE_TEST =
      '{"method":"POST","url":"/test","controller":"controller2"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST',
          method: 'GET',
          url: '/',
          controller: 'controller1',
        },
      ],
      socketIO: undefined,
    });
  });

  test('should handle missing or malformed keys gracefully in SERVER_ROUTE_* variables', () => {
    process.env.SERVER_ROUTE_TEST_1 = '{"method":"GET"}';
    process.env.SERVER_ROUTE_TEST_2 = '[]';
    process.env.SERVER_ROUTE_TEST_3 = '{"method":"POST","url":"/test"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST_1',
          method: 'GET',
          url: undefined,
          controller: undefined,
        },
        {
          id: 'SERVER_ROUTE_TEST_2',
          method: undefined,
          url: undefined,
          controller: undefined,
        },
        {
          id: 'SERVER_ROUTE_TEST_3',
          method: 'POST',
          url: '/test',
          controller: undefined,
        },
      ],
      socketIO: undefined,
    });
  });

  test('should handle multiple routes with mixed undefined, null, and incomplete fields', () => {
    process.env.SERVER_ROUTE_TEST_1 = '{"method":"GET","url":"/path"}';
    process.env.SERVER_ROUTE_TEST_2 = '{"controller":"homeController"}';
    process.env.SERVER_ROUTE_TEST_3 = '{"method":"POST"}';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [
        {
          id: 'SERVER_ROUTE_TEST_1',
          method: 'GET',
          url: '/path',
          controller: undefined,
        },
        {
          id: 'SERVER_ROUTE_TEST_2',
          method: undefined,
          url: undefined,
          controller: 'homeController',
        },
        {
          id: 'SERVER_ROUTE_TEST_3',
          method: 'POST',
          url: undefined,
          controller: undefined,
        },
      ],
      socketIO: undefined,
    });
  });

  test('should handle an environment variable SERVER_SOCKET_IO with boolean-like strings', () => {
    process.env.SERVER_SOCKET_IO = 'true';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [],
      socketIO: 'true',
    });

    process.env.SERVER_SOCKET_IO = 'false';
    expect(service.build()).toEqual<ServerDtoModel>({
      routes: [],
      socketIO: 'false',
    });
  });
});
