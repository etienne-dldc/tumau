import http, { OutgoingHttpHeaders, ServerResponse, IncomingMessage } from 'http';
import { Duplex } from 'stream';
import { Middleware } from './Middleware';
import { TumauRequest } from './TumauRequest';
import { TumauResponse } from './TumauResponse';
import { HttpStatus } from './HttpStatus';
import { HttpMethod } from './HttpMethod';
import { HttpHeaders } from './HttpHeaders';
import { isWritableStream } from './utils';
import { HandleErrors } from './HandleErrors';
import { HandleInvalidResponse } from './HandleInvalidResponse';
import { Context } from '@tumau/middleware';
import { HttpError } from './HttpError';

// We force a deault value because this context is alway present !
const RequestContext = Context.create<TumauRequest>(null as any);
export const RequestConsumer = RequestContext.Consumer;

// Response might not exist in the case of an `upgrade` event (WebSocket)
const ServerResponseContext = Context.create<ServerResponse>();
export const ServerResponseConsumer = ServerResponseContext.Consumer;

const UpgradeSocketContext = Context.create<Duplex>();
export const UpgradeSocketConsumer = UpgradeSocketContext.Consumer;

const UpgradeHeadContext = Context.create<Buffer>();
export const UpgradeHeadConsumer = UpgradeHeadContext.Consumer;

export interface Server {
  httpServer: http.Server;
  listen(port: number, listeningListener?: () => void): Server;
}

interface Options {
  mainMiddleware: Middleware;
  // include HandleErrors and HandleInvalidResponse middelwares
  handleErrors?: boolean;
  httpServer?: http.Server;
  // The server should handle the 'request' event (default true)
  handleServerRequest?: boolean;
  // The server should handle the 'upgrade' event (default false)
  // this is used for websocket
  handleServerUpgrade?: boolean;
}

export const Server = {
  create: createServer,
};

function createServer(opts: Middleware | Options): Server {
  const options = typeof opts === 'function' ? { mainMiddleware: opts } : opts;
  const {
    mainMiddleware,
    handleErrors = true,
    httpServer,
    handleServerRequest = true,
    handleServerUpgrade = false,
  } = options;

  const resolvedHttpServer: http.Server = httpServer || http.createServer();

  const server: Server = {
    httpServer: resolvedHttpServer,
    listen,
  };

  const rootMiddleware: Middleware = Middleware.compose(
    handleErrors ? HandleErrors : null,
    handleErrors ? HandleInvalidResponse : null,
    mainMiddleware
  );

  return server;

  function listen(port: number, listeningListener?: () => void): Server {
    if (handleServerRequest) {
      resolvedHttpServer.on('request', requestHandler);
    }
    if (handleServerUpgrade) {
      resolvedHttpServer.on('upgrade', upgradeHandler);
    }
    resolvedHttpServer.listen(port, listeningListener);
    return server;
  }

  async function requestHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const request = new TumauRequest(req);

    const requestCtx = RequestContext.Provider(request);
    const resCtx = ServerResponseContext.Provider(res);

    return Middleware.runWithContexts(rootMiddleware, [requestCtx, resCtx], () => null)
      .then(response => {
        sendResponseAny(response, res, request);
      })
      .catch((err): void => {
        // fatal
        console.error(err);
        if (!res.finished) {
          res.end();
        }
      });
  }

  async function upgradeHandler(req: IncomingMessage, socket: Duplex, head: Buffer): Promise<void> {
    const request = new TumauRequest(req, { isUpgrade: true });

    const requestCtx = RequestContext.Provider(request);
    const socketCtx = UpgradeSocketContext.Provider(socket);
    const headCtx = UpgradeHeadContext.Provider(head);

    return Middleware.runWithContexts(rootMiddleware, [requestCtx, socketCtx, headCtx], () => null)
      .then(response => {
        // On upgrade if no response we just destroy the socket.
        if (response === null) {
          socket.destroy();
          return;
        }
        if (response instanceof Error || response instanceof HttpError) {
          // we can't send response so HttpError are fatal
          throw response;
        }
        if (response instanceof TumauResponse === false) {
          throw new Error('The returned response is not valid (does not inherit the TumauResponse class)');
        }
        if (response.code !== 101) {
          throw new Error(`An 'upgrade' event must return null or a 101 response (got a ${response.code})`);
        }
        if (response instanceof TumauResponse.SwitchingProtocols) {
          response.handler(req, socket, head);
        }
        // socket handled => do nothing
        return;
      })
      .catch((err): void => {
        // fatal
        console.error(err);
        socket.destroy();
      });
  }

  function sendResponseAny(response: any, res: ServerResponse, request: TumauRequest): void {
    if (res.finished) {
      throw new Error('Response finished ?');
    }
    if (res.headersSent) {
      throw new Error('Header already sent !');
    }
    if (response === null) {
      throw new Error('Response is null');
    }
    if (response instanceof TumauResponse === false) {
      throw new Error('The returned response is not valid (does not inherit the TumauResponse class)');
    }
    return sendResponse(response, res, request);
  }

  function sendResponse(response: TumauResponse, res: ServerResponse, request: TumauRequest): void {
    const headers: OutgoingHttpHeaders = {
      ...response.headers,
    };

    const isEmpty =
      HttpStatus.isEmpty(response.code) || request.method === HttpMethod.HEAD || request.method === HttpMethod.OPTIONS;

    if (isEmpty) {
      // remove content related header
      if (headers[HttpHeaders.ContentType]) {
        delete headers[HttpHeaders.ContentType];
      }
      if (headers[HttpHeaders.ContentLength]) {
        delete headers[HttpHeaders.ContentLength];
      }
      if (headers[HttpHeaders.ContentEncoding]) {
        delete headers[HttpHeaders.ContentEncoding];
      }
    }

    const body = response.body;

    let code = response.code;
    if (code === 200 && isEmpty) {
      code = 204;
    }

    res.writeHead(code, headers);

    if (isEmpty) {
      return res.end();
    }
    // send body
    if (body === null || body === undefined) {
      return res.end();
    }
    if (typeof body === 'string') {
      return res.end(body);
    }
    if (isWritableStream(body)) {
      body.pipe(res);
      return;
    }
    throw new Error(`Invalid body`);
  }
}
