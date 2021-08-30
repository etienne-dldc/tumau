export declare const HttpHeaders: {
    readonly Accept: "accept";
    readonly AcceptEncoding: "accept-encoding";
    readonly AccessControlAllowCredentials: "access-control-allow-credentials";
    readonly AccessControlAllowHeaders: "access-control-allow-headers";
    readonly AccessControlAllowMethods: "access-control-allow-methods";
    readonly AccessControlAllowOrigin: "access-control-allow-origin";
    readonly AccessControlExposeHeaders: "access-control-expose-headers";
    readonly AccessControlMaxAge: "access-control-max-age";
    readonly AccessControlRequestHeaders: "access-control-request-headers";
    readonly AccessControlRequestMethod: "access-control-request-method";
    readonly Allow: "allow";
    readonly Authorization: "authorization";
    readonly ContentEncoding: "content-encoding";
    readonly ContentLength: "content-length";
    readonly ContentType: "content-type";
    readonly Cookie: "cookie";
    readonly Location: "location";
    readonly Origin: "origin";
    readonly SetCookie: "set-cookie";
    readonly XHTTPMethodOverride: "x-http-method-override";
    readonly XRequestedWith: "x-requested-with";
};
export declare type HttpHeadersName = typeof HttpHeaders[keyof typeof HttpHeaders];
