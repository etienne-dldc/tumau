import { IncomingMessage } from 'http';
import { StringDecoder } from 'string_decoder';
import {
  Middleware,
  HttpMethod,
  HttpHeaders,
  ContentType,
  ContentEncoding,
  HttpError,
  BaseContext,
  ResultSync,
} from '@tumau/core';

interface Options {
  // limit in byte
  limit?: number;
}

export interface JsonParserCtx extends BaseContext {
  jsonBody?: object | null;
}

export function JsonParser<Ctx extends JsonParserCtx>(options: Options = {}): Middleware<Ctx> {
  const _1mb = 1024 * 1024 * 1024;
  const { limit = _1mb } = options;

  // Allowed whitespace is defined in RFC 7159
  // http://www.rfc-editor.org/rfc/rfc7159.txt
  const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;

  return async (ctx, next): Promise<ResultSync<Ctx>> => {
    const headers = ctx.request.headers;
    if (
      ctx.request.method === HttpMethod.GET ||
      ctx.request.method === HttpMethod.DELETE ||
      ctx.request.method === HttpMethod.OPTIONS
    ) {
      return next(ctx);
    }
    const lengthStr = headers[HttpHeaders.ContentLength];
    if (lengthStr === undefined || Array.isArray(lengthStr)) {
      throw new HttpError.LengthRequired();
    }

    const length = parseInt(lengthStr, 10);
    if (Number.isNaN(length)) {
      throw new HttpError.LengthRequired();
    }
    if (length === 0) {
      return next(ctx);
    }
    const type = headers[HttpHeaders.ContentType];
    if (type !== ContentType.Json) {
      return next(ctx);
    }
    const encoding = headers[HttpHeaders.ContentEncoding] || ContentEncoding.Identity;
    if (encoding !== ContentEncoding.Identity) {
      throw new HttpError.NotAcceptable(`${encoding} not supported`);
    }
    if (length > limit) {
      throw new HttpError.PayloadTooLarge();
    }
    const jsonBody = await parseBody(ctx.request.req, length, limit);
    return next({
      ...ctx,
      jsonBody,
    });
  };

  async function parseBody(req: IncomingMessage, length: number, limit: number): Promise<object> {
    const str = await readStream(req, length, limit);

    if (!str) {
      return {};
    }
    // strict JSON test
    if (!strictJSONReg.test(str)) {
      throw new Error('invalid JSON, only supports object and array');
    }
    return JSON.parse(str);
  }

  function readStream(stream: IncomingMessage, length: number, limit: number): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
      let complete = false;
      let sync = true;
      let received = 0;
      let buffer = '';

      const decoder = new StringDecoder('utf8');

      // attach listeners
      stream.on('aborted', onAborted);
      stream.on('close', cleanup);
      stream.on('data', onData);
      stream.on('end', onEnd);
      stream.on('error', onEnd);

      // mark sync section complete
      sync = false;

      function done(err: unknown, data?: string): void {
        // mark complete
        complete = true;

        if (sync) {
          process.nextTick(invokeCallback);
        } else {
          invokeCallback();
        }

        function invokeCallback(): void {
          cleanup();

          if (err) {
            // halt the stream on error
            stream.unpipe();
            stream.pause();
            return reject(err);
          }

          resolve(data);
        }
      }

      function onAborted(): void {
        if (complete) {
          return;
        }
        done(new Error('request aborted'));
      }

      function onData(chunk: Buffer): void {
        if (complete) {
          return;
        }
        received += chunk.length;
        if (received > limit) {
          done(new HttpError.PayloadTooLarge());
        } else {
          buffer += decoder.write(chunk);
        }
      }

      function onEnd(err: unknown): void {
        if (complete) {
          return;
        }
        if (err) {
          return done(err);
        }

        if (received !== length) {
          done(new HttpError(400, 'Request size did not match content length'));
        } else {
          const output = buffer + decoder.end();
          done(null, output);
        }
      }

      function cleanup(): void {
        buffer = '';

        stream.removeListener('aborted', onAborted);
        stream.removeListener('data', onData);
        stream.removeListener('end', onEnd);
        stream.removeListener('error', onEnd);
        stream.removeListener('close', cleanup);
      }
    });
  }
}
