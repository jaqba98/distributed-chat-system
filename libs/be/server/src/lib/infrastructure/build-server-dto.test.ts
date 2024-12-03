import 'reflect-metadata';
import { BuildServerDtoService } from './build-server-dto.service';

describe('BuildServerDtoService - build', () => {
  let service: BuildServerDtoService;
  const originalEnv = { ...process.env };

  beforeEach(() => {
    service = new BuildServerDtoService();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('should return a complete server DTO when all environment variables are set correctly', () => {
    process.env['SERVER_TYPE'] = 'http';
    process.env['SERVER_ROUTE_ROOT'] =
      '{"method":"GET","url":"/","controller":"rootController"}';
    process.env['SERVER_ROUTE_HELLO'] =
      '{"method":"GET","url":"/hello","controller":"helloController"}';
    process.env['SERVER_SOCKET_IO'] = '{"controller":"socketIOController"}';

    const result = service.build();

    expect(result).toEqual({
      serverType: 'http',
      serverRoutes: [
        {
          id: 'SERVER_ROUTE_ROOT',
          method: 'GET',
          url: '/',
          controller: 'rootController',
        },
        {
          id: 'SERVER_ROUTE_HELLO',
          method: 'GET',
          url: '/hello',
          controller: 'helloController',
        },
      ],
      serverSocketIO: { controller: 'socketIOController' },
    });
  });

  it('should handle missing SERVER_TYPE gracefully', () => {
    delete process.env['SERVER_TYPE'];
    process.env['SERVER_ROUTE_ROOT'] =
      '{"method":"GET","url":"/","controller":"rootController"}';
    process.env['SERVER_ROUTE_HELLO'] =
      '{"method":"GET","url":"/hello","controller":"helloController"}';
    process.env['SERVER_SOCKET_IO'] = '{"controller":"socketIOController"}';

    const result = service.build();

    expect(result).toEqual({
      serverType: undefined,
      serverRoutes: [
        {
          id: 'SERVER_ROUTE_ROOT',
          method: 'GET',
          url: '/',
          controller: 'rootController',
        },
        {
          id: 'SERVER_ROUTE_HELLO',
          method: 'GET',
          url: '/hello',
          controller: 'helloController',
        },
      ],
      serverSocketIO: { controller: 'socketIOController' },
    });
  });

  it('should handle missing SERVER_ROUTE_* variables gracefully', () => {
    process.env['SERVER_TYPE'] = 'http';
    delete process.env['SERVER_ROUTE_ROOT'];
    delete process.env['SERVER_ROUTE_HELLO'];
    process.env['SERVER_SOCKET_IO'] = '{"controller":"socketIOController"}';

    const result = service.build();

    expect(result).toEqual({
      serverType: 'http',
      serverRoutes: undefined,
      serverSocketIO: { controller: 'socketIOController' },
    });
  });

  it('should handle missing SERVER_SOCKET_IO gracefully', () => {
    process.env['SERVER_TYPE'] = 'http';
    process.env['SERVER_ROUTE_ROOT'] =
      '{"method":"GET","url":"/","controller":"rootController"}';
    process.env['SERVER_ROUTE_HELLO'] =
      '{"method":"GET","url":"/hello","controller":"helloController"}';
    delete process.env['SERVER_SOCKET_IO'];

    const result = service.build();

    expect(result).toEqual({
      serverType: 'http',
      serverRoutes: [
        {
          id: 'SERVER_ROUTE_ROOT',
          method: 'GET',
          url: '/',
          controller: 'rootController',
        },
        {
          id: 'SERVER_ROUTE_HELLO',
          method: 'GET',
          url: '/hello',
          controller: 'helloController',
        },
      ],
      serverSocketIO: undefined,
    });
  });

  it('should handle invalid JSON in SERVER_ROUTE_* variables gracefully', () => {
    process.env['SERVER_TYPE'] = 'http';
    process.env['SERVER_ROUTE_INVALID'] = '{"method":"GET","url":"/invalid"';
    process.env['SERVER_SOCKET_IO'] = '{"controller":"socketIOController"}';

    const result = service.build();

    expect(result).toEqual({
      serverType: 'http',
      serverRoutes: [
        {
          id: 'SERVER_ROUTE_INVALID',
          method: undefined,
          url: undefined,
          controller: undefined,
        },
      ],
      serverSocketIO: { controller: 'socketIOController' },
    });
  });

  it('should handle invalid JSON in SERVER_SOCKET_IO gracefully', () => {
    process.env['SERVER_TYPE'] = 'http';
    process.env['SERVER_ROUTE_ROOT'] =
      '{"method":"GET","url":"/","controller":"rootController"}';
    process.env['SERVER_ROUTE_HELLO'] =
      '{"method":"GET","url":"/hello","controller":"helloController"}';
    process.env['SERVER_SOCKET_IO'] = '{"controller":"socketIOController"';

    const result = service.build();

    expect(result).toEqual({
      serverType: 'http',
      serverRoutes: [
        {
          id: 'SERVER_ROUTE_ROOT',
          method: 'GET',
          url: '/',
          controller: 'rootController',
        },
        {
          id: 'SERVER_ROUTE_HELLO',
          method: 'GET',
          url: '/hello',
          controller: 'helloController',
        },
      ],
      serverSocketIO: undefined,
    });
  });
});
