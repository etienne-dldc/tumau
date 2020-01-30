import { TumauServer, TumauResponse, HttpMethod, HttpError } from 'tumau';
import koa from 'koa';
import { mountTumau } from '../utils/mountTumau';
import { mountKoa } from '../utils/mountKoa';
import fetch from 'node-fetch';

describe('TumauServer', () => {
  test('create a TumauServer without crashing', () => {
    expect(() => TumauServer.create(() => null)).not.toThrowError();
  });

  test('simple text response', async () => {
    const app = TumauServer.create(() => {
      return TumauResponse.withText('Hey');
    });
    const { url, close } = await mountTumau(app);
    const res = await fetch(url);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.text()).toBe('Hey');
    await close();
  });

  test('send two requests', async () => {
    const app = TumauServer.create(() => {
      return TumauResponse.withText('Hey');
    });

    const { url, close } = await mountTumau(app);

    const res = await fetch(url);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    const res2 = await fetch(url);
    expect(res2).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    await close();
  });

  test('response to arbitrary path', async () => {
    const app = TumauServer.create(() => {
      return TumauResponse.withText('Hey');
    });
    const { close, url } = await mountTumau(app);
    const res = await fetch(`${url}${'/some/path'}`);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.text()).toBe('Hey');
    await close();
  });

  test('response to post method', async () => {
    const app = TumauServer.create(() => {
      return TumauResponse.withText('Hey');
    });
    const { close, url } = await mountTumau(app);
    const res = await fetch(url, { method: HttpMethod.POST });
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.text()).toBe('Hey');
    await close();
  });

  test('head request return 204 & empty body', async () => {
    const app = TumauServer.create(() => {
      return TumauResponse.withText('Hey');
    });
    const { close, url } = await mountTumau(app);
    const res = await fetch(url, {
      method: HttpMethod.HEAD,
    });
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 204 No Content
      Connection: close
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.text()).toBe('');
    await close();
  });

  test('should return the same result as koa', async () => {
    const tumauApp = TumauServer.create(() => {
      return TumauResponse.withText('Hey');
    });
    const koaApp = new koa();
    koaApp.use((ctx: any) => {
      ctx.body = 'Hey';
    });

    const tumauServer = await mountTumau(tumauApp);
    const koaServer = await mountKoa(koaApp);

    const tumauRes = await fetch(tumauServer.url);
    const koaRes = await fetch(koaServer.url);

    expect(tumauRes).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(koaRes).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 3
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);

    await tumauServer.close();
    await koaServer.close();
  });

  test('throw HttpError return an error', async () => {
    const app = TumauServer.create(() => {
      throw new HttpError.NotFound();
    });
    const { close, url } = await mountTumau(app);
    const res = await fetch(url);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 404 Not Found
      Connection: close
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
      Transfer-Encoding: chunked
    `);
    expect(await res.text()).toEqual('Error 404: Not Found');
    await close();
  });

  test('throw return an error', async () => {
    const app = TumauServer.create(() => {
      throw new Error('Oops');
    });
    const { close, url } = await mountTumau(app);
    const res = await fetch(url);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 500 Internal Server Error
      Connection: close
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
      Transfer-Encoding: chunked
    `);
    expect(await res.text()).toEqual('Error 500: Internal Server Error: Oops');
    await close();
  });

  test('error contains stack when debug is true', async () => {
    const app = TumauServer.create({
      mainMiddleware: () => {
        throw new Error('Oops');
      },
      debug: true,
    });
    const { close, url } = await mountTumau(app);
    const res = await fetch(url);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 500 Internal Server Error
      Connection: close
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
      Transfer-Encoding: chunked
    `);
    const body = await res.text();
    expect(body).toMatch('Function.fromError');
    expect(body).toMatch('HandleErrors.ts:');
    await close();
  });
});
