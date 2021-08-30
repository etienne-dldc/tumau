"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,i=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&a(e,r,t[r]);if(n)for(var r of n(t))s.call(t,r)&&a(e,r,t[r]);return e},c=(e,n)=>t(e,r(n));Object.defineProperty(exports,"__esModule",{value:!0}),exports[Symbol.toStringTag]="Module";var u=require("miid"),l=require("http"),d=require("stream"),p=require("string_decoder"),h=require("chemin"),f=require("querystring");function m(e){if(e&&e.__esModule)return e;var t={__proto__:null,[Symbol.toStringTag]:"Module"};return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var g=m(u);const w={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",306:"(Unused)",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"};const x={getMessage:(e,t)=>w[e]+(t?`: ${t}`:""),get:function(e){return{code:e,message:w[e]}},isEmpty:e=>e<200||[204,205,304].indexOf(e)>=0,isError:e=>e>=400};class y extends Error{constructor(e,t){super("HttpError"),!1===x.isError(e)?(console.error([`You passed a non error HTTP code to HttpError (${e}). Tumau will use a 500 code instead.`,"If you want to interupt the flow with a non-error response you can `throw new Response()`"].join("\n")),this.code=500):this.code=e,this.message=t||x.getMessage(e),Object.setPrototypeOf(this,new.target.prototype)}}y.LengthRequired=class extends y{constructor(){super(411)}},y.NotAcceptable=class extends y{constructor(e){super(406,x.getMessage(406,e)),this.info=e}},y.PayloadTooLarge=class extends y{constructor(){super(413)}},y.BadRequest=class extends y{constructor(e){super(400,x.getMessage(400,e)),this.info=null,this.info=e||null}},y.NotFound=class extends y{constructor(){super(404)}},y.ServerDidNotRespond=class extends y{constructor(){super(500,x.getMessage(500,"Server did not respond"))}},y.Internal=class extends y{constructor(e="",t){super(500,`${x.getMessage(500)}: ${e}`),this.internalStack=t}static fromError(e){if(e instanceof Error)throw new y.Internal(e.message,e.stack);throw new y.Internal(String(e))}},y.Forbidden=class extends y{constructor(e){super(403,`${x.getMessage(403,e)}`)}},y.Unauthorized=class extends y{constructor(e){super(401,x.getMessage(401,e))}},y.TooManyRequests=class extends y{constructor(e){super(429,`${x.getMessage(429,e)}`)}};const C={Accept:"accept",AcceptEncoding:"accept-encoding",AccessControlAllowCredentials:"access-control-allow-credentials",AccessControlAllowHeaders:"access-control-allow-headers",AccessControlAllowMethods:"access-control-allow-methods",AccessControlAllowOrigin:"access-control-allow-origin",AccessControlExposeHeaders:"access-control-expose-headers",AccessControlMaxAge:"access-control-max-age",AccessControlRequestHeaders:"access-control-request-headers",AccessControlRequestMethod:"access-control-request-method",Allow:"allow",Authorization:"authorization",ContentEncoding:"content-encoding",ContentLength:"content-length",ContentType:"content-type",Cookie:"cookie",Location:"location",Origin:"origin",SetCookie:"set-cookie",XHTTPMethodOverride:"x-http-method-override",XRequestedWith:"x-requested-with"},E={GET:"GET",HEAD:"HEAD",PATCH:"PATCH",OPTIONS:"OPTIONS",DELETE:"DELETE",POST:"POST",PUT:"PUT"},T=new Set(Object.keys(E).map((e=>E[e]))),b=c(i({},E),{__ALL:T});function O(...e){return g.compose(...e)}function P(e){if(null==e)throw Error("Unexpected nill");return e}class v{constructor(e,t={}){const{isUpgrade:r=!1}=t,n=P(e.url),o=P(e.method),s=e.headers[C.Origin]||null;this.isUpgrade=r,this.req=e,this.url=n,this.method=o,this.headers=e.headers,this.origin=s}}class A{}const S={Html:"text/html",Json:"application/json",Text:"text/plain",GraphQL:"application/graphql"},R={Utf8:"utf-8"},M=/; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,H=/^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,q=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,I=/\\([\u000b\u0020-\u00ff])/g,U=/([\\"])/g,k=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,L={parse:function(e){let t=e.indexOf(";");const r=-1!==t?e.substr(0,t).trim():e.trim();if(!k.test(r))throw new TypeError("invalid media type");const n={};if(-1!==t){let r,o,s;for(M.lastIndex=t;o=M.exec(e);){if(o.index!==t)throw new TypeError("invalid parameter format");t+=o[0].length,r=o[1].toLowerCase(),s=o[2],'"'===s[0]&&(s=s.substr(1,s.length-2).replace(I,"$1")),n[r]=s}if(t!==e.length)throw new TypeError("invalid parameter format")}return{type:r.toLowerCase(),parameters:n}},format:function(e){if(!e||"object"!=typeof e)throw new TypeError("argument obj is required");const t=e.parameters,r=e.type;if(!r||!k.test(r))throw new TypeError("invalid type");let n=r;t&&"object"==typeof t&&Object.entries(t).sort().forEach((([e,t])=>{if(void 0!==t){if(!q.test(e))throw new TypeError("invalid parameter name");n+="; "+e+"="+function(e){const t=String(e);if(q.test(t))return t;if(t.length>0&&!H.test(t))throw new TypeError("invalid parameter value");return'"'+t.replace(U,"\\$1")+'"'}(t)}}));return n}};class j extends A{constructor(e={}){super();const{code:t=200,headers:r={},body:n=null,originalResponse:o=null}=e;this.code=t,this.body=n,this.headers=r,this.originalResponse=o}extends(e={}){return{body:e.body||this.body,code:e.code||this.code,originalResponse:this,headers:i(i({},this.headers),e.headers||{})}}static withText(e){return new j({body:e,headers:{[C.ContentLength]:e.length,[C.ContentType]:L.format({type:S.Text,parameters:{charset:R.Utf8}})}})}static withHtml(e){return new j({body:e,headers:{[C.ContentLength]:e.length,[C.ContentType]:[S.Html,R.Utf8].join("; ")}})}static noContent(){return new j({code:204})}static redirect(e,t=!1){return new j({code:t?301:302,headers:{[C.Location]:e}})}static withStream(e,t){return new j({body:e,headers:{[C.ContentLength]:t}})}static isTumauResponse(e){return!!e&&e instanceof j}static fromError(e,t){if(e instanceof y){const r=e instanceof y.Internal&&e.internalStack||e.stack;return new j({code:e.code,body:N(e,r,t)})}return e instanceof Error?j.fromError(new y.Internal(e.message),t):j.fromError(new y.Internal(String(e)),t)}}function N(e,t,r){if(!1===r)return`Error ${e.code}: ${e.message}`;let n="";return t&&(n="\n\n"+t),`Error ${e.code}: ${e.message}`+n}class F extends A{constructor(e){super(),this.handler=e}}class $ extends A{constructor(e){super(),this.handler=e}static fromError(e){return new $((async(t,r)=>{console.error(e),r.destroy()}))}}const D=u.createContext({name:"Request",defaultValue:null}),B=D.Consumer,z=u.createContext({name:"Response"}),_=z.Consumer,G=u.createContext({name:"UpgradeSocket"}),J=G.Consumer,W=u.createContext({name:"UpgradeHead"}),V=W.Consumer,Z=u.createContext({name:"Debug",defaultValue:!1}),X=Z.Consumer;function Y(e){const t="function"==typeof e?{mainMiddleware:e}:e,{mainMiddleware:r,debug:n=!1}=t;return{requestHandler:async function(e,t){const o=new v(e),s=D.Provider(o),a=z.Provider(t),c=Z.Provider(n);return Promise.resolve(r(u.ContextStack.createFrom(s,a,c),(()=>null))).then((e=>async function(e,t,r){if(e instanceof F)return void(await e.handler(r.req,t));if(t.writableEnded)throw new Error("Response finished ?");if(t.headersSent)throw new Error("Header already sent !");if(null===e)throw new Error("Response is null");if(e instanceof j==!1)throw new Error("The returned response is not valid (does not inherit the TumauResponse class)");return function(e,t,r){const n=i({},e.headers),o=x.isEmpty(e.code)||r.method===b.HEAD||r.method===b.OPTIONS;o&&(n[C.ContentType]&&delete n[C.ContentType],n[C.ContentLength]&&delete n[C.ContentLength],n[C.ContentEncoding]&&delete n[C.ContentEncoding]);const s=e.body;let a=e.code;200===a&&o&&(a=204);if(t.writeHead(a,n),o)return t.end();if(null==s)return t.end();if("string"==typeof s)return t.end(s);if(c=s,function(e){return null!==e&&"object"==typeof e&&"function"==typeof e.pipe}(c)&&!1!==c.writable)return void s.pipe(t);var c;throw new Error("Invalid body")}(e,t,r)}(e,t,o))).catch((e=>{console.error(e),t.writableEnded||t.end()}))},upgradeHandler:async function(e,t,o){const s=new v(e,{isUpgrade:!0}),a=D.Provider(s),i=G.Provider(t),c=W.Provider(o),l=Z.Provider(n);return Promise.resolve(r(u.ContextStack.createFrom(a,i,c,l),(()=>null))).then((r=>{if(null!==r){if(r instanceof $)return r.handler(e,t,o);if(r instanceof j)throw new Error("Tumau received a TumauResponse on an 'upgrade' event. You should return null or a 'TumauUpgradeResponse'");if(r instanceof F)throw new Error("Tumau received a TumauHandlerResponse on an 'upgrade' event. You should return null or a 'TumauUpgradeResponse'");if(r instanceof Error||r instanceof y)throw r;throw new Error("Invalid response")}t.destroy()})).catch((e=>{console.error(e),t.destroy()}))}}}const Q=u.createContext({name:"Compress"}),K=Q.Consumer;class ee extends d.Readable{constructor(e){super(),this.str=e,this.ended=!1}_read(){this.ended||(process.nextTick((()=>{this.push(Buffer.from(this.str,"utf8")),this.push(null)})),this.ended=!0)}}var te={};const re={Brotli:"br",Deflate:"deflate",Gzip:"gzip",Identity:"identity"};class ne extends j{constructor(e,t){const r=ne.encodeBodyWithEncodings(e.body,t),n=c(i({},e.headers),{[C.ContentEncoding]:t});delete n[C.ContentLength],super({body:r,code:e.code,headers:n}),this.originalResponse=e}static encodeBodyWithEncodings(e,t){if(null===e)return null;let r="string"==typeof e?new ee(e):e;return t.forEach((e=>{r=ne.encodeBodyWithEncoding(r,e)})),r}static encodeBodyWithEncoding(e,t){return t===re.Brotli?e.pipe(te.createBrotliCompress()):t===re.Gzip?e.pipe(te.createGzip()):t===re.Deflate?e.pipe(te.createDeflate()):e}static fromResponse(e,t){return null===e.body||x.isEmpty(e.code)?e:new ne(e,t)}}const oe={toString:function(e,t){const r=[];r.push(`${e}=${t.value}`),e.startsWith("__Secure")&&(t.secure=!0);e.startsWith("__Host")&&(t.path="/",t.secure=!0,delete t.domain);if(t.expires){const e=function(e){function t(e){return e.padStart(2,"0")}const r=t(e.getUTCDate().toString()),n=t(e.getUTCHours().toString()),o=t(e.getUTCMinutes().toString()),s=t(e.getUTCSeconds().toString()),a=e.getUTCFullYear(),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e.getUTCDay()]}, ${r} ${i[e.getUTCMonth()]} ${a} ${n}:${o}:${s} GMT`}(t.expires);r.push(`Expires=${e}`)}if(t.maxAge&&Number.isInteger(t.maxAge)){if(t.maxAge<=0)throw new Error("Max-Age must be an integer superior to 0");r.push(`Max-Age=${t.maxAge}`)}t.domain&&r.push(`Domain=${t.domain}`);t.path&&r.push(`Path=${t.path}`);t.secure&&r.push("Secure");t.httpOnly&&r.push("HttpOnly");t.sameSite&&r.push(`SameSite=${t.sameSite}`);return r.join("; ")},create:ae,delete:function(e,t={}){return ae(e,"",i({expires:new Date(0)},t))}},se={parse:function(e){const t=e.split(/\s*;\s*/),r={};return t.forEach((e=>{const[t,n]=e.split("="),o=t.trim();r[o]=n})),r}};function ae(e,t,r={}){const{httpOnly:n=!0,path:o="/"}=r;return i({name:e,value:t,httpOnly:n,path:o},r)}class ie extends j{constructor(e,t){super(e.extends({headers:{[C.SetCookie]:ie.buildSetCookieHeader(t)}})),this.originalResponse=e}static buildSetCookieHeader(e){try{const t={};e.forEach((e=>{t[e.name]=e}));const r=Object.keys(t);if(0===r.length)return;if(1===r.length){const e=r[0];return oe.toString(e,t[e])}return r.map((e=>oe.toString(e,t[e])))}catch(t){return void console.error(t)}}static fromResponse(e,t){return 0===t.length||x.isError(e.code)?e:new ie(e,t)}}const ce=u.createContext({name:"CookieParser",defaultValue:{}}),ue=ce.Consumer;const le=u.createContext({name:"CookieManager"}),de=le.Consumer;class pe extends j{constructor(e,t){if(e instanceof j==!1)throw new y.Internal("originalResponse is expected to be a TumauResponse instance");super(e.extends({headers:he(t)})),this.originalResponse=e,this.cors=t}static fromResponse(e,t){const r=null===e?j.noContent():e,n=he(t);return 0===Object.keys(n).length?e:new pe(r,t)}}function he(e){const t={};return e.allowOrigin&&(t[C.AccessControlAllowOrigin]=e.allowOrigin),e.allowCredentials&&(t[C.AccessControlAllowCredentials]="true"),e.exposeHeaders&&e.exposeHeaders.length>0&&(t[C.AccessControlExposeHeaders]=e.exposeHeaders.join(", ")),t}const fe=[b.POST,b.GET,b.PUT,b.PATCH,b.DELETE,b.OPTIONS],me=[C.XRequestedWith,C.AccessControlAllowOrigin,C.XHTTPMethodOverride,C.ContentType,C.Authorization,C.Accept],ge=[],we=86400,xe=["*"],ye=!1;function Ce(e){if(e instanceof RegExp)return t=>Boolean(t.match(e));if(-1===e.indexOf("*"))return t=>t===e;{const t="^"+e.replace(".","\\.").replace("*",".*")+"$";return e=>Boolean(e.match(t))}}function Ee(e){const{allowOrigin:t=xe,allowCredentials:r=ye,exposeHeaders:n=ge}=e,o=function(e){const t=e.map(Ce);return e=>!!e&&t.some((t=>t(e)))}(t);return e=>!(!e||!o(e))&&{allowOrigin:e,allowCredentials:r,exposeHeaders:n}}function Te(e={}){const{allowOrigin:t=xe,allowCredentials:r=ye}=e;if(t.indexOf("*")>=0&&!0===r)throw new Error("credentials not supported with wildcard");const n=Ee(e);return async(e,t)=>{const r=e.getOrFail(B),o=r.origin,s=await t(e);if(r.isUpgrade)return s;if(s instanceof F)return s;if(s instanceof j==!1)throw new y.Internal("Cors received an invalid response !");const a=n(o);if(!1===a)return s;const i=s;return pe.fromResponse(i,a)}}class be extends j{constructor(e){super({headers:Oe(e)}),this.cors=e}}function Oe(e){const t={};return e.allowOrigin&&(t[C.AccessControlAllowOrigin]=e.allowOrigin),e.allowCredentials&&(t[C.AccessControlAllowCredentials]="true"),null!==e.maxAge&&(t[C.AccessControlMaxAge]=e.maxAge),e.allowMethods&&e.allowMethods.length>0&&(t[C.AccessControlAllowMethods]=e.allowMethods.join(", ")),e.allowHeaders&&e.allowHeaders.length>0&&(t[C.AccessControlAllowHeaders]=e.allowHeaders.join(", ")),e.exposeHeaders&&e.exposeHeaders.length>0&&(t[C.AccessControlExposeHeaders]=e.exposeHeaders.join(", ")),t}function Pe(e={}){const{allowOrigin:t=xe,allowCredentials:r=ye}=e;if(t.indexOf("*")>=0&&!0===r)throw new Error("credentials not supported with wildcard");const n=function(e){const t=Ee(e);return r=>{const n=t(r);if(!1===n)return!1;const{allowHeaders:o=me,allowMethods:s=fe,maxAge:a=we}=e;return c(i({},n),{allowHeaders:o,allowMethods:s,maxAge:a})}}(e);return async(e,t)=>{const r=e.getOrFail(B),o=r.origin;if(!r.headers[C.AccessControlRequestMethod])return t(e);const s=n(o);return!1===s?t(e):new be(s)}}async function ve(e,t,r){const n=await function(e,t){return new Promise(((r,n)=>{let o=!1,s=0,a="",i=!0;const c=new p.StringDecoder("utf8"),u=(t,s)=>{o=!0;const a=()=>{if(f(),t)return e.unpipe(),e.pause(),n(t);r(null!=s?s:"")};i?process.nextTick(a):a()},l=()=>{o||u(new Error("request aborted"))},d=e=>{o||(s+=e.length,s>t?u(new y.PayloadTooLarge):a+=c.write(e))},h=e=>{if(o)return;if(e)return u(e);const t=a+c.end();u(null,t)},f=()=>{a="",e.removeListener("aborted",l),e.removeListener("data",d),e.removeListener("end",h),e.removeListener("error",h),e.removeListener("close",f)};e.on("aborted",l),e.on("close",f),e.on("data",d),e.on("end",h),e.on("error",h),i=!1}))}(e,t);if(null!==r&&n&&n.length>r)throw new y.PayloadTooLarge;return n}const Ae=u.createContext({name:"StringBody"}),Se=Ae.Consumer,Re=[S.Json,S.Text,S.Html,S.GraphQL];const Me=/^[\x20\x09\x0a\x0d]*(\[|\{)/,He=u.createContext({name:"JsonParser"}),qe=He.Consumer;class Ie extends j{constructor(e){const{code:t=200,headers:r={},json:n}=e,o=JSON.stringify(n);super({code:t,headers:c(i({},r),{[C.ContentType]:S.Json,[C.ContentLength]:Buffer.byteLength(o,"utf8")}),body:o}),this.json=n}static withJson(e){return new Ie({json:e})}static fromError(e,t){if(e instanceof y){const r=(e instanceof y.Internal?e.internalStack:e.stack)||"";return new Ie({code:e.code,json:i({code:e.code,message:e.message},t?{stack:r}:{})})}return e instanceof Error?Ie.fromError(new y.Internal(e.message,e.stack),t):Ie.fromError(new y.Internal(String(e)),t)}static fromResponse(e,t){if(null===e)return Ie.fromError(new y.ServerDidNotRespond,t);if(e instanceof y||e instanceof Error)return Ie.fromError(e,t);if(e instanceof j){if(e instanceof Ie)return e;const r=e;if(x.isEmpty(r.code))return r;if(r.headers[C.ContentType]===S.Json)return e;const n=r.body;return null===n?new Ie({code:r.code,headers:i({},r.headers),json:{}}):"string"==typeof n?new Ie({code:r.code,headers:i({},r.headers),json:n}):Ie.fromError(new y.Internal("Invalid response: Expected a JsonResponse got a TumauResponse"),t)}return Ie.fromError(new y.Internal("Invalid response: Expected a JsonResponse"),t)}}const Ue={createByIp:function(e){const{errorMessage:t,storeCleanupSize:r,strategy:n}=e;return ke({errorMessage:t||(e=>`too many request from ${e}`),storeCleanupSize:r,strategy:n})},createGlobal:function(e){const{errorMessage:t,storeCleanupSize:r,strategy:n}=e,o=ke({errorMessage:t?(e,r)=>t(r):void 0,storeCleanupSize:r,strategy:n});return{hit:()=>o.hit(null)}},create:ke};function ke(e){const{strategy:t,storeCleanupSize:r=500,errorMessage:n}=e,o=new Map;return{hit:e=>{const s=Date.now();let a=o.get(e);a&&null!==a.expireAt&&a.expireAt<s&&(a=void 0);const{next:i,allowed:c,expireAt:u}=t(a?a.state:void 0,s);if(o.set(e,{state:i,expireAt:u}),o.size>=r){const e=[];o.forEach(((t,r)=>{null!==t.expireAt&&t.expireAt<s&&e.push(r)})),e.forEach((e=>{o.delete(e)}))}if(!c){const t=n?n(e,i):void 0;throw new y.TooManyRequests(t)}return i}}}const Le={MaxCount:function(e){return(t={count:0})=>({next:{count:t.count+1},allowed:t.count<e,expireAt:null})},MaxByPeriod:function(e,t){return(r,n)=>{const o=r&&r.periodEnd<n;if(!r||o)return{next:{count:1,periodEnd:n+t},allowed:!0,expireAt:n+t};return{next:{count:r.count+1,periodEnd:r.periodEnd},allowed:r.count<e,expireAt:r.periodEnd}}},Penalize:function(e){const{limit:t,period:r,maxPenalty:n=10,penaltyPeriod:o=r}=e;return(e,s)=>{if(void 0===e)return{next:{count:1,penalty:0,periodEnd:s+r,penaltyEnd:0},allowed:!0,expireAt:s+r};const a=s<e.penaltyEnd,i=e.count+1>t;if(a||i){const t=Math.min(n,e.penalty+1),r=s+o*t;return{next:{count:0,periodEnd:0,penalty:t,penaltyEnd:r},allowed:!1,expireAt:r}}if(e&&e.periodEnd<s)return{next:{count:0,periodEnd:s+r,penalty:0,penaltyEnd:0},allowed:!0,expireAt:r};return{next:{count:e.count+1,periodEnd:e.periodEnd,penalty:0,penaltyEnd:0},allowed:!0,expireAt:null}}}};const je=e=>(t,...r)=>Fe({pattern:t,exact:!0,method:e},r),Ne={find:function(e,t,r){const n=h.splitPathname(t);return e.map(((e,t)=>{if(null===e.pattern)return{route:e,index:t,params:{}};const o=e.pattern.match(n);if(!1===o)return!1;if(e.exact&&o.rest.length>0)return!1;return!1!=(null===r||null===e.method||e.method===r)&&{index:t,route:e,params:o.params}})).filter((e=>!1!==e))},groupByPattern:function(e){const t=[];return e.forEach((e=>{const r=e.pattern,n=null===r?t.find((e=>null===e.pattern)):t.find((e=>null!==e.pattern&&e.pattern.equal(r)));n?n.routes.push(e):t.push({pattern:r,routes:[e]})})),t},create:Fe,GET:je(b.GET),POST:je(b.POST),PUT:je(b.PUT),DELETE:je(b.DELETE),PATCH:je(b.PATCH),namespace:(e,t)=>t.map((t=>c(i({},t),{pattern:null===t.pattern?h.Chemin.create(e):h.Chemin.create(e,t.pattern)}))),group:(e,t)=>{const r=$e(e);return t.map((e=>c(i({},e),{middleware:O(r,e.middleware)})))},fallback:(...e)=>Fe({exact:!1,isFallback:!0},e)};function Fe({isFallback:e=!1,method:t=null,pattern:r=null,exact:n=!0},o){return{pattern:r,middleware:$e(o),method:t,exact:n,isFallback:e}}function $e(e){return Array.isArray(e)?O(...e):e}const De=u.createContext({name:"Router"}),Be=De.Consumer,ze=u.createContext({name:"RouterAllowedMethods"});ze.Consumer;class _e extends j{constructor(e,t){const r=Array.from(t.values()).join(",");super(e.extends({headers:{[C.Allow]:r}})),this.originalResponse=e,this.allowedMethods=t}}function Ge(e){return async(t,r)=>{const n=await r(t.with(ze.Provider(e)));if(n instanceof F)return n;if(null!==n&&n instanceof j==!1)throw new y.Internal("AllowedMethods received an invalid response !");const o=null===n?new j({code:204}):n;return new _e(o,e)}}const Je=u.createContext({name:"UrlParser"}),We=Je.Consumer;function Ve(e,t={}){const r=Pe(t),n=Ne.groupByPattern(e),o=new Map,s=[];return n.forEach((({pattern:e,routes:t})=>{const n=t.find((e=>e.method===b.OPTIONS));if(n){const e=c(i({},n),{middleware:O(r,n.middleware)});o.set(n,e)}else s.push(Ne.create({pattern:e,exact:!0,method:b.OPTIONS},r))})),e.forEach((e=>{const t=o.get(e);t?s.push(t):s.push(e)})),s}Object.defineProperty(exports,"Context",{enumerable:!0,get:function(){return u.Context}}),Object.defineProperty(exports,"ContextConsumer",{enumerable:!0,get:function(){return u.ContextConsumer}}),Object.defineProperty(exports,"ContextProvider",{enumerable:!0,get:function(){return u.ContextProvider}}),Object.defineProperty(exports,"ContextProviderFn",{enumerable:!0,get:function(){return u.ContextProviderFn}}),Object.defineProperty(exports,"ContextStack",{enumerable:!0,get:function(){return u.ContextStack}}),Object.defineProperty(exports,"createContext",{enumerable:!0,get:function(){return u.createContext}}),Object.defineProperty(exports,"Chemin",{enumerable:!0,get:function(){return h.Chemin}}),Object.defineProperty(exports,"CheminMatch",{enumerable:!0,get:function(){return h.CheminMatch}}),Object.defineProperty(exports,"CheminMatchMaybe",{enumerable:!0,get:function(){return h.CheminMatchMaybe}}),Object.defineProperty(exports,"CheminParam",{enumerable:!0,get:function(){return h.CheminParam}}),Object.defineProperty(exports,"splitPathname",{enumerable:!0,get:function(){return h.splitPathname}}),exports.AllowedMethodsResponse=_e,exports.AllowedMethodsRoutes=function(e){const t=[],r=Ne.groupByPattern(e),n=new Map;return r.forEach((({pattern:e,routes:r})=>{if(null!==e){const o=r.reduce(((e,t)=>t.isFallback?e:null===e||null===t.method?null:(e.add(t.method),e)),new Set([b.OPTIONS]))||b.__ALL;if(1===o.size)return;const s=r.find((e=>e.method===b.OPTIONS));if(s){const e=c(i({},s),{middleware:O(Ge(o),s.middleware)});n.set(s,e)}else t.push(Ne.create({pattern:e,exact:!0,method:b.OPTIONS},Ge(o)))}})),e.forEach((e=>{const r=n.get(e);r?t.push(r):t.push(e)})),t},exports.Compress=async(e,t)=>{const r=e.getOrFail(B),n=r.isUpgrade,o=r.headers[C.AcceptEncoding],s={acceptedEncoding:"string"==typeof o?o.split(/, ?/):Array.isArray(o)?o:[re.Identity],usedEncoding:null},a=await t(e.with(Q.Provider(s)));if(n)return a;if(null===a)return a;if(a instanceof F)return a;if(a instanceof j==!1)throw new y.Internal("Compress received an invalid response !");const i=a,c=s.acceptedEncoding.indexOf(re.Brotli)>=0?[re.Brotli]:s.acceptedEncoding.indexOf(re.Gzip)>=0?[re.Gzip]:s.acceptedEncoding.indexOf(re.Deflate)>=0?[re.Deflate]:[re.Identity];return ne.fromResponse(i,c)},exports.CompressConsumer=K,exports.CompressResponse=ne,exports.ContentEncoding=re,exports.ContentType=S,exports.ContentTypeCharset=R,exports.ContentTypeUtils=L,exports.CookieManager=function(){return async(e,t)=>{const r=e.getOrFail(B).isUpgrade;let n=[];const o={set:(e,t,r)=>{n.push(oe.create(e,t,r))},has:e=>void 0!==n.find((t=>t.name===e)),delete:(e,t)=>{n.push(oe.delete(e,t))},unset:e=>{n=n.filter((t=>t.name!==e))}},s=await t(e.with(le.Provider(o)));if(r)return n.length&&console.warn("Cookies set/deleted in an upgrade event are ignored"),s;if(null===s)return null;if(s instanceof F)return s;if(s instanceof j==!1)throw new y.Internal("CookieManager received an invalid response !");const a=s;return ie.fromResponse(a,n)}},exports.CookieManagerConsumer=de,exports.CookieParser=function(){return async(e,t)=>{const r=e.getOrFail(B).headers[C.Cookie],n=void 0===r?{}:se.parse(r);return t(e.with(ce.Provider(n)))}},exports.CookieParserConsumer=ue,exports.CookieResponse=ie,exports.Cookies=se,exports.CorsActual=Te,exports.CorsActualResponse=pe,exports.CorsPreflight=Pe,exports.CorsPreflightResponse=be,exports.CorsPreflightRoutes=Ve,exports.CorsRoutes=function(e={}){return t=>Ve(t.map((t=>{const{pattern:r,exact:n,method:o,middleware:s,isFallback:a}=t;return o===b.OPTIONS?t:Ne.create({pattern:r,exact:n,method:o,isFallback:a},O(Te(e),s))})),e)},exports.DebugConsumer=X,exports.ErrorToHttpError=async(e,t)=>{try{return await t(e)}catch(r){if(r instanceof y)throw r;throw y.Internal.fromError(r)}},exports.HttpError=y,exports.HttpErrorToJsonResponse=async(e,t)=>{const r=e.get(X);if(e.getOrFail(B).isUpgrade)return t(e);try{return await t(e)}catch(n){if(n instanceof y)return Ie.fromError(n,r);throw n}},exports.HttpErrorToTextResponse=async(e,t)=>{const r=e.getOrFail(B).isUpgrade,n=e.get(X);try{return await t(e)}catch(o){if(o instanceof y==!1)throw o;return r?$.fromError(o):j.fromError(o,n)}},exports.HttpHeaders=C,exports.HttpMethod=b,exports.HttpStatus=x,exports.InvalidResponseToHttpError=async(e,t)=>{const r=e.get(B).isUpgrade,n=await t(e);if(r){if(null==n)throw new y.ServerDidNotRespond;if(n instanceof $==!1)throw new y.Internal("The returned response is not valid (does not inherit the TumauUpgradeResponse class)");return n}if(null==n)throw new y.ServerDidNotRespond;if(n instanceof F)return n;if(n instanceof j==!1)throw new y.Internal("The returned response is not valid (does not inherit the TumauResponse class)");return n},exports.JsonParser=function(){return async(e,t)=>{const r=e.getOrFail(B),n=r.headers,o=e.with(He.Provider(null));if(r.method===b.GET||r.method===b.DELETE||r.method===b.OPTIONS)return t(o);const s=n[C.ContentType];if(!s)return t(o);const a=L.parse(s),i=e.getOrFail(Se),c=a.type===S.Json;if(null===i||0===i.length||!c)return t(o);if(!Me.test(i))throw new y.NotAcceptable("invalid JSON, only supports object and array");const u=JSON.parse(i);return t(e.with(He.Provider(u)))}},exports.JsonParserConsumer=qe,exports.JsonResponse=Ie,exports.LimitStrategy=Le,exports.RateLimit=Ue,exports.RequestConsumer=B,exports.Route=Ne,exports.Router=function(e){return async(t,r)=>{t.has(De.Consumer)&&console.warn(["Warning: Using a Router inside another Router will break 'Allow' header and CORS !","If you want to group routes together you can use Route.namespace() or the low level Route.create()"].join("\n"));const n=t.getOrFail(We),o=t.getOrFail(B).method,s=Ne.find(e,n.pathname,o);return async function e(n){const o=s[n]||null,a=o?o.route:null,i=a?a.pattern:null,c=i?i.extract():[],u=o?o.params:{},l=e=>c.indexOf(e)>=0,d={notFound:null===o,pattern:i,params:u,has:l,get:e=>l(e)?u:null,getOrFail:e=>{if(!l(e))throw new Error("Chemin is not part of the route context !");return u}},p=t.with(De.Provider(d));if(null===o)return r(p);if(null===o.route.middleware)return r(p);const h=await o.route.middleware(p,r);if(null===h)return e(n+1);return h}(0)}},exports.RouterConsumer=Be,exports.SameSite={Strict:"Strict",Lax:"Lax",None:"None"},exports.ServerResponseConsumer=_,exports.SetCookie=oe,exports.StringBodyConsumer=Se,exports.StringBodyParser=function(e={}){const t=1073741824,{limit:r=t}=e;return async(e,t)=>{const n=e.getOrFail(B),o=n.headers,s=e.with(Ae.Provider(null));if(n.method===b.GET||n.method===b.DELETE||n.method===b.OPTIONS)return t(s);const a=o[C.ContentType];if(!a)return t(s);const i=L.parse(a);if(!1===Re.includes(i.type))return t(s);const c=(()=>{const e=o[C.ContentLength];if(void 0===e||Array.isArray(e))return null;const t=parseInt(e,10);return Number.isNaN(t)?null:t})();if(0===c)return t(s);if(null!==c&&c>r)throw new y.PayloadTooLarge;const u=await ve(n.req,r,c);return t(e.with(Ae.Provider(u)))}},exports.TODO=!0,exports.TumauBaseResponse=A,exports.TumauHandlerResponse=F,exports.TumauRequest=v,exports.TumauResponse=j,exports.TumauUpgradeResponse=$,exports.UpgradeHeadConsumer=V,exports.UpgradeSocketConsumer=J,exports.UrlParser=function(){return(e,t)=>{if(e.has(Je.Consumer))return t(e);const r=function(e){const t={query:null,search:null,href:e,path:e,pathname:e},r=e.indexOf("?",1);if(-1!==r){const n=e.substring(r);t.search=n,t.query=n.substring(1),t.pathname=e.substring(0,r)}return t}(e.getOrFail(B).url),n={path:r.path,pathname:r.pathname,rawQuery:r.query,query:r.query?f.parse(r.query):null,search:r.search};return t(e.with(Je.Provider(n)))}},exports.UrlParserConsumer=We,exports.compose=O,exports.createServer=function(e){const t="function"==typeof e?{mainMiddleware:e}:e,{httpServer:r,handleServerRequest:a=!0,handleServerUpgrade:i=!1}=t,c=((e,t)=>{var r={};for(var a in e)o.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&n)for(var a of n(e))t.indexOf(a)<0&&s.call(e,a)&&(r[a]=e[a]);return r})(t,["httpServer","handleServerRequest","handleServerUpgrade"]),{requestHandler:u,upgradeHandler:d}=Y(c),p=r||l.createServer(),h={httpServer:p,requestHandler:u,upgradeHandler:d,listen:function(e,t){a&&p.on("request",u);i&&p.on("upgrade",d);return p.listen(e,t),h}};return h};
