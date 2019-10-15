<p align="center">
  <img src="https://github.com/etienne-dldc/tumau/blob/master/design/logo.svg" width="597" alt="tumau logo">
</p>

# 🏺 Tumau

> A Zero dependency node HTTP server written in Typescript

Tumau is a small NodeJS server (just like [Express](https://expressjs.com/) or [Koa](https://koajs.com/)) with zero external dependencies and written in TypeScript.

## Gist

```ts
import { Server, Response, RequestContext } from 'tumau';

const server = Server.create(ctx => {
  const request = ctx.get(RequestContext);
  return Response.withText(`Hello World ! (from ${request.url})`);
});

server.listen(3002, () => {
  console.log(`Server is up at http://localhost:3002`);
});
```

## Benefits over Express/Koa/Other

- Written in Typescript (strong yet easy-to-use types)
- Zero-dependency (easy to audit)
- Simple to extends (using middleware)
- Minimal (contains only the bare minimum)

## Install

```bash
# npm
npm install tumau

# yarn
yarn add tumau
```

## Packages

The `tumau` package is a proxi for different packages:

- [`@tumau/core`](https://github.com/etienne-dldc/tumau/tree/master/packages/tumau-core)
- [`@tumau/url-parser`](https://github.com/etienne-dldc/tumau/tree/master/packages/tumau-url-parser) for parsing url (pathname, query...)
- [`@tumau/router`](https://github.com/etienne-dldc/tumau/tree/master/packages/tumau-router) for routing (it uses `@tumau/url-parser` for url parsing)
- [`@tumau/json`](https://github.com/etienne-dldc/tumau/tree/master/packages/tumau-json) for parsing / sending JSON
- [`@tumau/compress`](https://github.com/etienne-dldc/tumau/tree/master/packages/tumau-compress) for Brotli / GZip / Deflate compression

## Overview

Like many other server, Tumau is based on middleware. A middleware is like a layer the request has to go though. At some point a response is created by one of the middleware and the response has to travel back to the outside (go through every layer in the opposite order) to be sent.

<p align="center">
  <img src="https://github.com/etienne-dldc/tumau/blob/master/design/illu-1.png" width="597">
</p>

A middleware can stop the chain and return a response. In that case the next middleware will not be called !

<p align="center">
  <img src="https://github.com/etienne-dldc/tumau/blob/master/design/illu-2.png" width="597">
</p>

## The context (ctx)

In tumau the context a way to share data between middleware.

```js
import { Context, Server, Middleware } from 'tumau';

// first let's create a context
const NumContext = Context.create(7); // 7 is the default value (optionnal)

// middleware
const myContextProvider = (ctx, next) => {
  // we provide our context
  const numProvider = NumContext.provide(42);
  // we create a new ctx by calling ctx.set()
  const nextCtx = ctx.set(numProvider);
  // we call next with our new context
  return next(nextCtx);
};

// middleware
const myContextConsumer = (ctx, next) => {
  const has = ctx.has(NumContext);
  const num = ctx.get(NumContext); // get the value of the default if not provided
  // if the context is required we could also call
  // const num = ctx.getOrThrow(NumContext);
  console.log({
    has,
    num,
  });
  return next(ctx);
};

const server = Server.create(
  Middleware.compose(
    myContextConsumer, // contex not there yet, will log { has: false, num: 7 } (7 is the default value)
    myContextProvider,
    myContextConsumer // logs { has: true, num: 42 }
  )
);

server.listen(3002, () => {
  console.log(`Server is up at http://localhost:3002`);
});
```

### For TypeScript users

Contexts are typed when you create them:

```ts
// here we could omit <number> because it would be infered
const NumCtx = Context.create<number>(0);

// you can omit the default value
const NameCtx = Context.create<string>();
```

## Middleware

A middleare is a function that:

- receives a context from the previous middleware
- receives a `next` function that will execute the next middleware
- can return a response or null (or a promise of one of them)

```ts
type Middleware = (ctx: Context, next: Next) => null | Response | Promise<null | Response>;
```

<p align="center">
  <img src="https://github.com/etienne-dldc/tumau/blob/master/design/illu-3.png" width="597">
</p>

```js
const myMiddleware = async (ctx, next) => {
  // 1. Context from previous middleware
  // (you need to call call `ctx.get()`)
  console.log(ctx); // { get, getOrThrow, set, has }
  // 2. We call `next` to call the next middleware
  const response = await next(ctx);
  // 3. The next middleware return a response
  console.log(response);
  // 4. We return that response
  return response;
};
```

### `next`

The `next` function is always async (it return a Promise).
It take one parameter: the `Context` and return a Promise of a Response or null

```ts
type Next = (ctx: Context) => Promise<Response | null>;
```

### Some examples

```js
// Return a response, ignore next middleware
const middleware = () => Response.withText('Hello');

// Return a response if the next middleware did not
const middleware = async (ctx, next) => {
  const response = await next(ctx);
  if (response === null) {
    return Response.withText('Not found');
  }
  return response;
};

// Add a item to the context before calling the next middleware
// return whatever the next middleware return
const middleware = (ctx, next) => {
  const nextCtx = ctx.set(ReceivedAtContext.provide(new Date()));
  return next(nextCtx);
};
```

### Conbining multiple Middlewares

The `Server.create` function take only one middleware as parameter. To use multiple middleware you need to combine them with `Middleware.compose`:

```js
import { Middleware } from 'tumau';

const composed = Middleware.compose(
  logger,
  cors,
  main
);

const server = Server.create(composed);
```

**Note**: Middlewares are executed in the order they are passed to `compose`. In the example above: `logger`, then `cors`, then `main` (then the reverse order on the way up).

## More Examples

Take a look a the [Examples](./tree/master/examples) folder !

## Performance

> Is it fast ?

I'm no expert in benchmarks but from [my attempt to measure it](https://github.com/etienne-dldc/tumau/tree/master/benchmarks) it's a bit faster than Koa and Express but not as fast as [fastify](https://github.com/fastify/fastify).

You can run the benchmark yourself by running `yarn benchmark` in the root folder of the monorepo. Fell free to add more framework or more complex cases !

## What does "Tumau" means

[According to Google Traduction](https://translate.google.com/?source=osdd#view=home&op=translate&sl=en&tl=mi&text=server) it is the translation of "server" in Maori but I'm not sure which definition it apply to. Anyway I thought it would make a cool name and it was not used on NPM so...