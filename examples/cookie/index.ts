import { createServer, TumauResponse, CookieResponse, SetCookie } from 'tumau';

const server = createServer(() => {
  return new CookieResponse(TumauResponse.noContent(), [SetCookie.create('token', 'T55YTRR55554')]);
});

server.listen(3002, () => {
  console.log(`Server is up at http://localhost:3002`);
});
