import {
  TumauServer,
  HttpError,
  HttpMethod,
  HttpHeaders,
  ContentType,
  JsonParser,
  HttpErrorToJson,
  JsonResponse,
  JsonParserConsumer,
  JsonPackage,
  TumauResponse,
  CookieManager,
  CookieManagerConsumer,
  compose,
} from 'tumau';
import { mountTumau } from '../utils/mountTumau';
import fetch from 'node-fetch';

describe('Server', () => {
  test('parse JSON body', async () => {
    const app = TumauServer.create(
      compose(HttpErrorToJson, JsonParser(), (ctx) => {
        return JsonResponse.withJson({ body: ctx.get(JsonParserConsumer) });
      })
    );
    const { close, url } = await mountTumau(app);
    const res = await fetch(url, {
      method: HttpMethod.POST,
      body: JSON.stringify({ name: 'Perceval', alias: 'Provençal le Gaulois' }),
      headers: {
        [HttpHeaders.ContentType]: ContentType.Json,
      },
    });
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 60
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.json()).toEqual({ body: { name: 'Perceval', alias: 'Provençal le Gaulois' } });
    await close();
  });

  test('JsonPackage handle JsonResponse', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), () => {
        return JsonResponse.withJson({ foo: 'bar' });
      })
    );
    const { close, url } = await mountTumau(app);

    const res5 = await fetch(url);
    expect(res5).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 13
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res5.json()).toEqual({ foo: 'bar' });

    await close();
  });

  test('JsonPackage handle null response', async () => {
    const app = TumauServer.create(compose(JsonPackage(), () => null));
    const { close, url } = await mountTumau(app);

    const res1 = await fetch(url);
    expect(res1).toMatchInlineSnapshot(`
      HTTP/1.1 500 Internal Server Error
      Connection: close
      Content-Length: 70
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res1.json()).toEqual({ code: 500, message: 'Internal Server Error: Server did not respond' });

    await close();
  });

  test('JsonPackage does not convert text to Json', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), () => {
        return TumauResponse.withText('Hello');
      })
    );
    const { close, url } = await mountTumau(app);

    const res2 = await fetch(url);
    expect(res2).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 5
      Content-Type: text/plain; charset=utf-8
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res2.text()).toEqual('Hello');

    await close();
  });

  test('JsonPackage handle HttpError and convert them to json', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), () => {
        throw new HttpError.NotFound();
      })
    );
    const { close, url } = await mountTumau(app);

    const res3 = await fetch(url);
    expect(res3).toMatchInlineSnapshot(`
      HTTP/1.1 404 Not Found
      Connection: close
      Content-Length: 34
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res3.json()).toEqual({ code: 404, message: 'Not Found' });

    await close();
  });

  test('JsonPackage handle Error and convert them to json', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), () => {
        throw new Error('Oops');
      })
    );
    const { close, url } = await mountTumau(app);

    const res4 = await fetch(url);
    expect(res4).toMatchInlineSnapshot(`
      HTTP/1.1 500 Internal Server Error
      Connection: close
      Content-Length: 52
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res4.json()).toEqual({ code: 500, message: 'Internal Server Error: Oops' });

    await close();
  });

  test('JsonPackage works with Cookies', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), CookieManager(), (ctx) => {
        ctx.getOrFail(CookieManagerConsumer).set('token', 'AZERTYUIO');
        return JsonResponse.withJson({ foo: 'bar' });
      })
    );
    const { close, url } = await mountTumau(app);

    const res = await fetch(url);
    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 13
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
      Set-Cookie: token=AZERTYUIO; Path=/; HttpOnly
    `);
    expect(await res.json()).toEqual({ foo: 'bar' });

    await close();
  });

  test('JsonPackage can read Json body', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), (ctx) => {
        const body = ctx.getOrFail(JsonParserConsumer);
        return JsonResponse.withJson(body);
      })
    );
    const { close, url } = await mountTumau(app);

    const res = await fetch(url, {
      headers: {
        'content-type': 'application/json',
      },
      body: '{"done":false}',
      method: 'POST',
    });

    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 14
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.json()).toEqual({ done: false });

    await close();
  });

  test('JsonPackage can read Json with Axio PUT', async () => {
    const app = TumauServer.create(
      compose(JsonPackage(), (ctx) => {
        const body = ctx.getOrFail(JsonParserConsumer);
        return JsonResponse.withJson(body);
      })
    );
    const { close, url } = await mountTumau(app);

    const res = await fetch(url, {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      body: '{"done":false}',
      method: 'PUT',
    });

    expect(res).toMatchInlineSnapshot(`
      HTTP/1.1 200 OK
      Connection: close
      Content-Length: 14
      Content-Type: application/json
      Date: Xxx, XX Xxx XXXX XX:XX:XX GMT
    `);
    expect(await res.json()).toEqual({ done: false });

    await close();
  });
});
