var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,i=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&a(e,r,t[r]);if(n)for(var r of n(t))s.call(t,r)&&a(e,r,t[r]);return e},c=(e,n)=>t(e,r(n));import*as l from"miid";import{createContext as u,ContextStack as d}from"miid";export{Context,ContextConsumer,ContextProvider,ContextProviderFn,ContextStack,createContext}from"miid";import{createServer as p}from"http";import{Readable as h}from"stream";import{StringDecoder as f}from"string_decoder";import{parse as m}from"querystring";import{Chemin as g,splitPathname as w}from"chemin";export{Chemin,CheminMatch,CheminMatchMaybe,CheminParam,splitPathname}from"chemin";const y={100:"Continue",101:"Switching Protocols",102:"Processing",103:"Early Hints",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",306:"(Unused)",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Too Early",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"};const E={getMessage:(e,t)=>y[e]+(t?`: ${t}`:""),get:function(e){return{code:e,message:y[e]}},isEmpty:e=>e<200||[204,205,304].indexOf(e)>=0,isError:e=>e>=400};class x extends Error{constructor(e,t){super("HttpError"),!1===E.isError(e)?(console.error([`You passed a non error HTTP code to HttpError (${e}). Tumau will use a 500 code instead.`,"If you want to interupt the flow with a non-error response you can `throw new Response()`"].join("\n")),this.code=500):this.code=e,this.message=t||E.getMessage(e),Object.setPrototypeOf(this,new.target.prototype)}}x.LengthRequired=class extends x{constructor(){super(411)}},x.NotAcceptable=class extends x{constructor(e){super(406,E.getMessage(406,e)),this.info=e}},x.PayloadTooLarge=class extends x{constructor(){super(413)}},x.BadRequest=class extends x{constructor(e){super(400,E.getMessage(400,e)),this.info=null,this.info=e||null}},x.NotFound=class extends x{constructor(){super(404)}},x.ServerDidNotRespond=class extends x{constructor(){super(500,E.getMessage(500,"Server did not respond"))}},x.Internal=class extends x{constructor(e="",t){super(500,`${E.getMessage(500)}: ${e}`),this.internalStack=t}static fromError(e){if(e instanceof Error)throw new x.Internal(e.message,e.stack);throw new x.Internal(String(e))}},x.Forbidden=class extends x{constructor(e){super(403,`${E.getMessage(403,e)}`)}},x.Unauthorized=class extends x{constructor(e){super(401,E.getMessage(401,e))}},x.TooManyRequests=class extends x{constructor(e){super(429,`${E.getMessage(429,e)}`)}};const C={Accept:"accept",AcceptEncoding:"accept-encoding",AccessControlAllowCredentials:"access-control-allow-credentials",AccessControlAllowHeaders:"access-control-allow-headers",AccessControlAllowMethods:"access-control-allow-methods",AccessControlAllowOrigin:"access-control-allow-origin",AccessControlExposeHeaders:"access-control-expose-headers",AccessControlMaxAge:"access-control-max-age",AccessControlRequestHeaders:"access-control-request-headers",AccessControlRequestMethod:"access-control-request-method",Allow:"allow",Authorization:"authorization",ContentEncoding:"content-encoding",ContentLength:"content-length",ContentType:"content-type",Cookie:"cookie",Location:"location",Origin:"origin",SetCookie:"set-cookie",XHTTPMethodOverride:"x-http-method-override",XRequestedWith:"x-requested-with"},T={GET:"GET",HEAD:"HEAD",PATCH:"PATCH",OPTIONS:"OPTIONS",DELETE:"DELETE",POST:"POST",PUT:"PUT"},v=new Set(Object.keys(T).map((e=>T[e]))),A=c(i({},T),{__ALL:v});function O(...e){return l.compose(...e)}function P(e){if(null==e)throw Error("Unexpected nill");return e}class S{constructor(e,t={}){const{isUpgrade:r=!1}=t,n=P(e.url),o=P(e.method),s=e.headers[C.Origin]||null;this.isUpgrade=r,this.req=e,this.url=n,this.method=o,this.headers=e.headers,this.origin=s}}class b{}const R={Html:"text/html",Json:"application/json",Text:"text/plain",GraphQL:"application/graphql"},M={Utf8:"utf-8"},H=/; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,I=/^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,U=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,L=/\\([\u000b\u0020-\u00ff])/g,q=/([\\"])/g,N=/^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,$={parse:function(e){let t=e.indexOf(";");const r=-1!==t?e.substr(0,t).trim():e.trim();if(!N.test(r))throw new TypeError("invalid media type");const n={};if(-1!==t){let r,o,s;for(H.lastIndex=t;o=H.exec(e);){if(o.index!==t)throw new TypeError("invalid parameter format");t+=o[0].length,r=o[1].toLowerCase(),s=o[2],'"'===s[0]&&(s=s.substr(1,s.length-2).replace(L,"$1")),n[r]=s}if(t!==e.length)throw new TypeError("invalid parameter format")}return{type:r.toLowerCase(),parameters:n}},format:function(e){if(!e||"object"!=typeof e)throw new TypeError("argument obj is required");const t=e.parameters,r=e.type;if(!r||!N.test(r))throw new TypeError("invalid type");let n=r;t&&"object"==typeof t&&Object.entries(t).sort().forEach((([e,t])=>{if(void 0!==t){if(!U.test(e))throw new TypeError("invalid parameter name");n+="; "+e+"="+function(e){const t=String(e);if(U.test(t))return t;if(t.length>0&&!I.test(t))throw new TypeError("invalid parameter value");return'"'+t.replace(q,"\\$1")+'"'}(t)}}));return n}};class k extends b{constructor(e={}){super();const{code:t=200,headers:r={},body:n=null,originalResponse:o=null}=e;this.code=t,this.body=n,this.headers=r,this.originalResponse=o}extends(e={}){return{body:e.body||this.body,code:e.code||this.code,originalResponse:this,headers:i(i({},this.headers),e.headers||{})}}static withText(e){return new k({body:e,headers:{[C.ContentLength]:e.length,[C.ContentType]:$.format({type:R.Text,parameters:{charset:M.Utf8}})}})}static withHtml(e){return new k({body:e,headers:{[C.ContentLength]:e.length,[C.ContentType]:[R.Html,M.Utf8].join("; ")}})}static noContent(){return new k({code:204})}static redirect(e,t=!1){return new k({code:t?301:302,headers:{[C.Location]:e}})}static withStream(e,t){return new k({body:e,headers:{[C.ContentLength]:t}})}static isTumauResponse(e){return!!e&&e instanceof k}static fromError(e,t){if(e instanceof x){const r=e instanceof x.Internal&&e.internalStack||e.stack;return new k({code:e.code,body:F(e,r,t)})}return e instanceof Error?k.fromError(new x.Internal(e.message),t):k.fromError(new x.Internal(String(e)),t)}}function F(e,t,r){if(!1===r)return`Error ${e.code}: ${e.message}`;let n="";return t&&(n="\n\n"+t),`Error ${e.code}: ${e.message}`+n}class j extends b{constructor(e){super(),this.handler=e}}class D extends b{constructor(e){super(),this.handler=e}static fromError(e){return new D((async(t,r)=>{console.error(e),r.destroy()}))}}const z=u({name:"Request",defaultValue:null}),B=z.Consumer,_=u({name:"Response"}),G=_.Consumer,J=u({name:"UpgradeSocket"}),W=J.Consumer,V=u({name:"UpgradeHead"}),Z=V.Consumer,X=u({name:"Debug",defaultValue:!1}),Y=X.Consumer;function Q(e){const t="function"==typeof e?{mainMiddleware:e}:e,{mainMiddleware:r,debug:n=!1}=t;return{requestHandler:async function(e,t){const o=new S(e),s=z.Provider(o),a=_.Provider(t),c=X.Provider(n);return Promise.resolve(r(d.createFrom(s,a,c),(()=>null))).then((e=>async function(e,t,r){if(e instanceof j)return void(await e.handler(r.req,t));if(t.writableEnded)throw new Error("Response finished ?");if(t.headersSent)throw new Error("Header already sent !");if(null===e)throw new Error("Response is null");if(e instanceof k==!1)throw new Error("The returned response is not valid (does not inherit the TumauResponse class)");return function(e,t,r){const n=i({},e.headers),o=E.isEmpty(e.code)||r.method===A.HEAD||r.method===A.OPTIONS;o&&(n[C.ContentType]&&delete n[C.ContentType],n[C.ContentLength]&&delete n[C.ContentLength],n[C.ContentEncoding]&&delete n[C.ContentEncoding]);const s=e.body;let a=e.code;200===a&&o&&(a=204);if(t.writeHead(a,n),o)return t.end();if(null==s)return t.end();if("string"==typeof s)return t.end(s);if(c=s,function(e){return null!==e&&"object"==typeof e&&"function"==typeof e.pipe}(c)&&!1!==c.writable)return void s.pipe(t);var c;throw new Error("Invalid body")}(e,t,r)}(e,t,o))).catch((e=>{console.error(e),t.writableEnded||t.end()}))},upgradeHandler:async function(e,t,o){const s=new S(e,{isUpgrade:!0}),a=z.Provider(s),i=J.Provider(t),c=V.Provider(o),l=X.Provider(n);return Promise.resolve(r(d.createFrom(a,i,c,l),(()=>null))).then((r=>{if(null!==r){if(r instanceof D)return r.handler(e,t,o);if(r instanceof k)throw new Error("Tumau received a TumauResponse on an 'upgrade' event. You should return null or a 'TumauUpgradeResponse'");if(r instanceof j)throw new Error("Tumau received a TumauHandlerResponse on an 'upgrade' event. You should return null or a 'TumauUpgradeResponse'");if(r instanceof Error||r instanceof x)throw r;throw new Error("Invalid response")}t.destroy()})).catch((e=>{console.error(e),t.destroy()}))}}}function K(e){const t="function"==typeof e?{mainMiddleware:e}:e,{httpServer:r,handleServerRequest:a=!0,handleServerUpgrade:i=!1}=t,c=((e,t)=>{var r={};for(var a in e)o.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&n)for(var a of n(e))t.indexOf(a)<0&&s.call(e,a)&&(r[a]=e[a]);return r})(t,["httpServer","handleServerRequest","handleServerUpgrade"]),{requestHandler:l,upgradeHandler:u}=Q(c),d=r||p(),h={httpServer:d,requestHandler:l,upgradeHandler:u,listen:function(e,t){a&&d.on("request",l);i&&d.on("upgrade",u);return d.listen(e,t),h}};return h}const ee=async(e,t)=>{const r=e.get(B).isUpgrade,n=await t(e);if(r){if(null==n)throw new x.ServerDidNotRespond;if(n instanceof D==!1)throw new x.Internal("The returned response is not valid (does not inherit the TumauUpgradeResponse class)");return n}if(null==n)throw new x.ServerDidNotRespond;if(n instanceof j)return n;if(n instanceof k==!1)throw new x.Internal("The returned response is not valid (does not inherit the TumauResponse class)");return n},te=async(e,t)=>{try{return await t(e)}catch(r){if(r instanceof x)throw r;throw x.Internal.fromError(r)}},re=async(e,t)=>{const r=e.getOrFail(B).isUpgrade,n=e.get(Y);try{return await t(e)}catch(o){if(o instanceof x==!1)throw o;return r?D.fromError(o):k.fromError(o,n)}},ne=u({name:"Compress"}),oe=ne.Consumer;class se extends h{constructor(e){super(),this.str=e,this.ended=!1}_read(){this.ended||(process.nextTick((()=>{this.push(Buffer.from(this.str,"utf8")),this.push(null)})),this.ended=!0)}}var ae={};const ie={Brotli:"br",Deflate:"deflate",Gzip:"gzip",Identity:"identity"};class ce extends k{constructor(e,t){const r=ce.encodeBodyWithEncodings(e.body,t),n=c(i({},e.headers),{[C.ContentEncoding]:t});delete n[C.ContentLength],super({body:r,code:e.code,headers:n}),this.originalResponse=e}static encodeBodyWithEncodings(e,t){if(null===e)return null;let r="string"==typeof e?new se(e):e;return t.forEach((e=>{r=ce.encodeBodyWithEncoding(r,e)})),r}static encodeBodyWithEncoding(e,t){return t===ie.Brotli?e.pipe(ae.createBrotliCompress()):t===ie.Gzip?e.pipe(ae.createGzip()):t===ie.Deflate?e.pipe(ae.createDeflate()):e}static fromResponse(e,t){return null===e.body||E.isEmpty(e.code)?e:new ce(e,t)}}const le=async(e,t)=>{const r=e.getOrFail(B),n=r.isUpgrade,o=r.headers[C.AcceptEncoding],s={acceptedEncoding:"string"==typeof o?o.split(/, ?/):Array.isArray(o)?o:[ie.Identity],usedEncoding:null},a=await t(e.with(ne.Provider(s)));if(n)return a;if(null===a)return a;if(a instanceof j)return a;if(a instanceof k==!1)throw new x.Internal("Compress received an invalid response !");const i=a,c=s.acceptedEncoding.indexOf(ie.Brotli)>=0?[ie.Brotli]:s.acceptedEncoding.indexOf(ie.Gzip)>=0?[ie.Gzip]:s.acceptedEncoding.indexOf(ie.Deflate)>=0?[ie.Deflate]:[ie.Identity];return ce.fromResponse(i,c)},ue={Strict:"Strict",Lax:"Lax",None:"None"},de={toString:function(e,t){const r=[];r.push(`${e}=${t.value}`),e.startsWith("__Secure")&&(t.secure=!0);e.startsWith("__Host")&&(t.path="/",t.secure=!0,delete t.domain);if(t.expires){const e=function(e){function t(e){return e.padStart(2,"0")}const r=t(e.getUTCDate().toString()),n=t(e.getUTCHours().toString()),o=t(e.getUTCMinutes().toString()),s=t(e.getUTCSeconds().toString()),a=e.getUTCFullYear(),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e.getUTCDay()]}, ${r} ${i[e.getUTCMonth()]} ${a} ${n}:${o}:${s} GMT`}(t.expires);r.push(`Expires=${e}`)}if(t.maxAge&&Number.isInteger(t.maxAge)){if(t.maxAge<=0)throw new Error("Max-Age must be an integer superior to 0");r.push(`Max-Age=${t.maxAge}`)}t.domain&&r.push(`Domain=${t.domain}`);t.path&&r.push(`Path=${t.path}`);t.secure&&r.push("Secure");t.httpOnly&&r.push("HttpOnly");t.sameSite&&r.push(`SameSite=${t.sameSite}`);return r.join("; ")},create:he,delete:function(e,t={}){return he(e,"",i({expires:new Date(0)},t))}},pe={parse:function(e){const t=e.split(/\s*;\s*/),r={};return t.forEach((e=>{const[t,n]=e.split("="),o=t.trim();r[o]=n})),r}};function he(e,t,r={}){const{httpOnly:n=!0,path:o="/"}=r;return i({name:e,value:t,httpOnly:n,path:o},r)}class fe extends k{constructor(e,t){super(e.extends({headers:{[C.SetCookie]:fe.buildSetCookieHeader(t)}})),this.originalResponse=e}static buildSetCookieHeader(e){try{const t={};e.forEach((e=>{t[e.name]=e}));const r=Object.keys(t);if(0===r.length)return;if(1===r.length){const e=r[0];return de.toString(e,t[e])}return r.map((e=>de.toString(e,t[e])))}catch(t){return void console.error(t)}}static fromResponse(e,t){return 0===t.length||E.isError(e.code)?e:new fe(e,t)}}const me=u({name:"CookieParser",defaultValue:{}}),ge=me.Consumer;function we(){return async(e,t)=>{const r=e.getOrFail(B).headers[C.Cookie],n=void 0===r?{}:pe.parse(r);return t(e.with(me.Provider(n)))}}const ye=u({name:"CookieManager"}),Ee=ye.Consumer;function xe(){return async(e,t)=>{const r=e.getOrFail(B).isUpgrade;let n=[];const o={set:(e,t,r)=>{n.push(de.create(e,t,r))},has:e=>void 0!==n.find((t=>t.name===e)),delete:(e,t)=>{n.push(de.delete(e,t))},unset:e=>{n=n.filter((t=>t.name!==e))}},s=await t(e.with(ye.Provider(o)));if(r)return n.length&&console.warn("Cookies set/deleted in an upgrade event are ignored"),s;if(null===s)return null;if(s instanceof j)return s;if(s instanceof k==!1)throw new x.Internal("CookieManager received an invalid response !");const a=s;return fe.fromResponse(a,n)}}class Ce extends k{constructor(e,t){if(e instanceof k==!1)throw new x.Internal("originalResponse is expected to be a TumauResponse instance");super(e.extends({headers:Te(t)})),this.originalResponse=e,this.cors=t}static fromResponse(e,t){const r=null===e?k.noContent():e,n=Te(t);return 0===Object.keys(n).length?e:new Ce(r,t)}}function Te(e){const t={};return e.allowOrigin&&(t[C.AccessControlAllowOrigin]=e.allowOrigin),e.allowCredentials&&(t[C.AccessControlAllowCredentials]="true"),e.exposeHeaders&&e.exposeHeaders.length>0&&(t[C.AccessControlExposeHeaders]=e.exposeHeaders.join(", ")),t}const ve=[A.POST,A.GET,A.PUT,A.PATCH,A.DELETE,A.OPTIONS],Ae=[C.XRequestedWith,C.AccessControlAllowOrigin,C.XHTTPMethodOverride,C.ContentType,C.Authorization,C.Accept],Oe=[],Pe=86400,Se=["*"],be=!1;function Re(e){if(e instanceof RegExp)return t=>Boolean(t.match(e));if(-1===e.indexOf("*"))return t=>t===e;{const t="^"+e.replace(".","\\.").replace("*",".*")+"$";return e=>Boolean(e.match(t))}}function Me(e){const{allowOrigin:t=Se,allowCredentials:r=be,exposeHeaders:n=Oe}=e,o=function(e){const t=e.map(Re);return e=>!!e&&t.some((t=>t(e)))}(t);return e=>!(!e||!o(e))&&{allowOrigin:e,allowCredentials:r,exposeHeaders:n}}function He(e={}){const{allowOrigin:t=Se,allowCredentials:r=be}=e;if(t.indexOf("*")>=0&&!0===r)throw new Error("credentials not supported with wildcard");const n=Me(e);return async(e,t)=>{const r=e.getOrFail(B),o=r.origin,s=await t(e);if(r.isUpgrade)return s;if(s instanceof j)return s;if(s instanceof k==!1)throw new x.Internal("Cors received an invalid response !");const a=n(o);if(!1===a)return s;const i=s;return Ce.fromResponse(i,a)}}class Ie extends k{constructor(e){super({headers:Ue(e)}),this.cors=e}}function Ue(e){const t={};return e.allowOrigin&&(t[C.AccessControlAllowOrigin]=e.allowOrigin),e.allowCredentials&&(t[C.AccessControlAllowCredentials]="true"),null!==e.maxAge&&(t[C.AccessControlMaxAge]=e.maxAge),e.allowMethods&&e.allowMethods.length>0&&(t[C.AccessControlAllowMethods]=e.allowMethods.join(", ")),e.allowHeaders&&e.allowHeaders.length>0&&(t[C.AccessControlAllowHeaders]=e.allowHeaders.join(", ")),e.exposeHeaders&&e.exposeHeaders.length>0&&(t[C.AccessControlExposeHeaders]=e.exposeHeaders.join(", ")),t}function Le(e={}){const{allowOrigin:t=Se,allowCredentials:r=be}=e;if(t.indexOf("*")>=0&&!0===r)throw new Error("credentials not supported with wildcard");const n=function(e){const t=Me(e);return r=>{const n=t(r);if(!1===n)return!1;const{allowHeaders:o=Ae,allowMethods:s=ve,maxAge:a=Pe}=e;return c(i({},n),{allowHeaders:o,allowMethods:s,maxAge:a})}}(e);return async(e,t)=>{const r=e.getOrFail(B),o=r.origin;if(r.method!==A.OPTIONS)return t(e);if(!r.headers[C.AccessControlRequestMethod])return t(e);const s=n(o);return!1===s?t(e):new Ie(s)}}async function qe(e,t,r){const n=await function(e,t){return new Promise(((r,n)=>{let o=!1,s=0,a="",i=!0;const c=new f("utf8"),l=(t,s)=>{o=!0;const a=()=>{if(h(),t)return e.unpipe(),e.pause(),n(t);r(null!=s?s:"")};i?process.nextTick(a):a()},u=()=>{o||l(new Error("request aborted"))},d=e=>{o||(s+=e.length,s>t?l(new x.PayloadTooLarge):a+=c.write(e))},p=e=>{if(o)return;if(e)return l(e);const t=a+c.end();l(null,t)},h=()=>{a="",e.removeListener("aborted",u),e.removeListener("data",d),e.removeListener("end",p),e.removeListener("error",p),e.removeListener("close",h)};e.on("aborted",u),e.on("close",h),e.on("data",d),e.on("end",p),e.on("error",p),i=!1}))}(e,t);if(null!==r&&n&&n.length>r)throw new x.PayloadTooLarge;return n}const Ne=u({name:"StringBody"}),$e=Ne.Consumer,ke=[R.Json,R.Text,R.Html,R.GraphQL];function Fe(e={}){const t=1073741824,{limit:r=t}=e;return async(e,t)=>{const n=e.getOrFail(B),o=n.headers,s=e.with(Ne.Provider(null));if(n.method===A.GET||n.method===A.DELETE||n.method===A.OPTIONS)return t(s);const a=o[C.ContentType];if(!a)return t(s);const i=$.parse(a);if(!1===ke.includes(i.type))return t(s);const c=(()=>{const e=o[C.ContentLength];if(void 0===e||Array.isArray(e))return null;const t=parseInt(e,10);return Number.isNaN(t)?null:t})();if(0===c)return t(s);if(null!==c&&c>r)throw new x.PayloadTooLarge;const l=await qe(n.req,r,c);return t(e.with(Ne.Provider(l)))}}const je=/^[\x20\x09\x0a\x0d]*(\[|\{)/,De=u({name:"JsonParser"}),ze=De.Consumer;function Be(){return async(e,t)=>{const r=e.getOrFail(B),n=r.headers,o=e.with(De.Provider(null));if(r.method===A.GET||r.method===A.DELETE||r.method===A.OPTIONS)return t(o);const s=n[C.ContentType];if(!s)return t(o);const a=$.parse(s),i=e.getOrFail($e),c=a.type===R.Json;if(null===i||0===i.length||!c)return t(o);if(!je.test(i))throw new x.NotAcceptable("invalid JSON, only supports object and array");const l=JSON.parse(i);return t(e.with(De.Provider(l)))}}class _e extends k{constructor(e){const{code:t=200,headers:r={},json:n}=e,o=JSON.stringify(n);super({code:t,headers:c(i({},r),{[C.ContentType]:R.Json,[C.ContentLength]:Buffer.byteLength(o,"utf8")}),body:o}),this.json=n}static withJson(e){return new _e({json:e})}static fromError(e,t){if(e instanceof x){const r=(e instanceof x.Internal?e.internalStack:e.stack)||"";return new _e({code:e.code,json:i({code:e.code,message:e.message},t?{stack:r}:{})})}return e instanceof Error?_e.fromError(new x.Internal(e.message,e.stack),t):_e.fromError(new x.Internal(String(e)),t)}static fromResponse(e,t){if(null===e)return _e.fromError(new x.ServerDidNotRespond,t);if(e instanceof x||e instanceof Error)return _e.fromError(e,t);if(e instanceof k){if(e instanceof _e)return e;const r=e;if(E.isEmpty(r.code))return r;if(r.headers[C.ContentType]===R.Json)return e;const n=r.body;return null===n?new _e({code:r.code,headers:i({},r.headers),json:{}}):"string"==typeof n?new _e({code:r.code,headers:i({},r.headers),json:n}):_e.fromError(new x.Internal("Invalid response: Expected a JsonResponse got a TumauResponse"),t)}return _e.fromError(new x.Internal("Invalid response: Expected a JsonResponse"),t)}}const Ge=async(e,t)=>{const r=e.get(Y);if(e.getOrFail(B).isUpgrade)return t(e);try{return await t(e)}catch(n){if(n instanceof x)return _e.fromError(n,r);throw n}},Je={createByIp:function(e){const{errorMessage:t,storeCleanupSize:r,strategy:n}=e;return We({errorMessage:t||(e=>`too many request from ${e}`),storeCleanupSize:r,strategy:n})},createGlobal:function(e){const{errorMessage:t,storeCleanupSize:r,strategy:n}=e,o=We({errorMessage:t?(e,r)=>t(r):void 0,storeCleanupSize:r,strategy:n});return{hit:()=>o.hit(null)}},create:We};function We(e){const{strategy:t,storeCleanupSize:r=500,errorMessage:n}=e,o=new Map;return{hit:e=>{const s=Date.now();let a=o.get(e);a&&null!==a.expireAt&&a.expireAt<s&&(a=void 0);const{next:i,allowed:c,expireAt:l}=t(a?a.state:void 0,s);if(o.set(e,{state:i,expireAt:l}),o.size>=r){const e=[];o.forEach(((t,r)=>{null!==t.expireAt&&t.expireAt<s&&e.push(r)})),e.forEach((e=>{o.delete(e)}))}if(!c){const t=n?n(e,i):void 0;throw new x.TooManyRequests(t)}return i}}}const Ve={MaxCount:function(e){return(t={count:0})=>({next:{count:t.count+1},allowed:t.count<e,expireAt:null})},MaxByPeriod:function(e,t){return(r,n)=>{const o=r&&r.periodEnd<n;if(!r||o)return{next:{count:1,periodEnd:n+t},allowed:!0,expireAt:n+t};return{next:{count:r.count+1,periodEnd:r.periodEnd},allowed:r.count<e,expireAt:r.periodEnd}}},Penalize:function(e){const{limit:t,period:r,maxPenalty:n=10,penaltyPeriod:o=r}=e;return(e,s)=>{if(void 0===e)return{next:{count:1,penalty:0,periodEnd:s+r,penaltyEnd:0},allowed:!0,expireAt:s+r};const a=s<e.penaltyEnd,i=e.count+1>t;if(a||i){const t=Math.min(n,e.penalty+1),r=s+o*t;return{next:{count:0,periodEnd:0,penalty:t,penaltyEnd:r},allowed:!1,expireAt:r}}if(e&&e.periodEnd<s)return{next:{count:0,periodEnd:s+r,penalty:0,penaltyEnd:0},allowed:!0,expireAt:r};return{next:{count:e.count+1,periodEnd:e.periodEnd,penalty:0,penaltyEnd:0},allowed:!0,expireAt:null}}}};const Ze=u({name:"UrlParser"}),Xe=Ze.Consumer;function Ye(){return(e,t)=>{if(e.has(Ze.Consumer))return t(e);const r=function(e){const t={query:null,search:null,href:e,path:e,pathname:e},r=e.indexOf("?",1);if(-1!==r){const n=e.substring(r);t.search=n,t.query=n.substring(1),t.pathname=e.substring(0,r)}return t}(e.getOrFail(B).url),n={path:r.path,pathname:r.pathname,rawQuery:r.query,query:r.query?m(r.query):null,search:r.search};return t(e.with(Ze.Provider(n)))}}const Qe=Symbol.for("__TUMAU_ROUTE_TOKEN__"),Ke=e=>(t,...r)=>tt({pattern:t,exact:!0,method:e},r),et={find:function(e,t,r){const n=w(t);return e.map(((e,t)=>{if(null===e.pattern)return{route:e,index:t,params:{}};const o=e.pattern.match(n);if(!1===o)return!1;if(e.exact&&o.rest.length>0)return!1;return!1!=(null===r||null===e.method||e.method===r)&&{index:t,route:e,params:o.params}})).filter((e=>!1!==e))},groupByPattern:function(e){const t=[];return e.forEach((e=>{const r=e.pattern,n=null===r?t.find((e=>null===e.pattern)):t.find((e=>null!==e.pattern&&e.pattern.equal(r)));n?n.routes.push(e):t.push({pattern:r,routes:[e]})})),t},create:tt,GET:Ke(A.GET),POST:Ke(A.POST),PUT:Ke(A.PUT),DELETE:Ke(A.DELETE),PATCH:Ke(A.PATCH),namespace:(e,t)=>t.map((t=>c(i({},t),{pattern:null===t.pattern?g.create(e):g.create(e,t.pattern)}))),group:(e,t)=>{const r=rt(e);return t.map((e=>c(i({},e),{middleware:O(r,e.middleware)})))},fallback:(...e)=>tt({exact:!1,isFallback:!0},e)};function tt({isFallback:e=!1,method:t=null,pattern:r=null,exact:n=!0},o){const s="string"==typeof r?g.parse(r):r;return{[Qe]:!0,pattern:s,middleware:rt(o),method:t,exact:n,isFallback:e}}function rt(e){return Array.isArray(e)?O(...e):e}const nt=u({name:"Router"}),ot=nt.Consumer,st=u({name:"RouterAllowedMethods"}),at=st.Consumer;class it extends k{constructor(e,t){const r=Array.from(t.values()).join(",");super(e.extends({headers:{[C.Allow]:r}})),this.originalResponse=e,this.allowedMethods=t}}function ct(e){const t=[],r=et.groupByPattern(e),n=new Map;return r.forEach((({pattern:e,routes:r})=>{if(null!==e){const o=r.reduce(((e,t)=>t.isFallback?e:null===e||null===t.method?null:(e.add(t.method),e)),new Set([A.OPTIONS]))||A.__ALL;if(1===o.size)return;const s=r.find((e=>e.method===A.OPTIONS));if(s){const e=c(i({},s),{middleware:O(lt(o),s.middleware)});n.set(s,e)}else t.push(et.create({pattern:e,exact:!0,method:A.OPTIONS},lt(o)))}})),e.forEach((e=>{const r=n.get(e);r?t.push(r):t.push(e)})),t}function lt(e){return async(t,r)=>{const n=await r(t.with(st.Provider(e)));if(n instanceof j)return n;if(null!==n&&n instanceof k==!1)throw new x.Internal("AllowedMethods received an invalid response !");const o=null===n?new k({code:204}):n;return new it(o,e)}}function ut(e){return async(t,r)=>{t.has(nt.Consumer)&&console.warn(["Warning: Using a Router inside another Router will break 'Allow' header for OPTIONS request !","If you want to group routes together you can use Route.namespace() or the low level Route.create()"].join("\n"));const n=t.getOrFail(Xe),o=t.getOrFail(B).method,s=et.find(e,n.pathname,o);return async function e(n){const o=s[n]||null,a=o?o.route:null,i=a?a.pattern:null,c=i?i.extract():[],l=o?o.params:{},u=e=>c.indexOf(e)>=0,d={notFound:null===o,pattern:i,params:l,has:u,get:e=>u(e)?l:null,getOrFail:e=>{if(!u(e))throw new Error("Chemin is not part of the route context !");return l}},p=t.with(nt.Provider(d));if(null===o)return r(p);if(null===o.route.middleware)return r(p);const h=await o.route.middleware(p,r);if(null===h)return e(n+1);return h}(0)}}function dt(e){return O(Ye(),ut(ct(e)))}const pt=!0;export{ct as AllowedMethods,le as Compress,oe as CompressConsumer,ce as CompressResponse,ie as ContentEncoding,R as ContentType,M as ContentTypeCharset,$ as ContentTypeUtils,xe as CookieManager,Ee as CookieManagerConsumer,we as CookieParser,ge as CookieParserConsumer,fe as CookieResponse,pe as Cookies,He as CorsActual,Ce as CorsActualResponse,Le as CorsPreflight,Ie as CorsPreflightResponse,Y as DebugConsumer,te as ErrorToHttpError,x as HttpError,Ge as HttpErrorToJsonResponse,re as HttpErrorToTextResponse,C as HttpHeaders,A as HttpMethod,E as HttpStatus,ee as InvalidResponseToHttpError,Be as JsonParser,ze as JsonParserConsumer,_e as JsonResponse,Ve as LimitStrategy,Je as RateLimit,B as RequestConsumer,et as Route,ut as Router,at as RouterAllowedMethodsConsumer,ot as RouterConsumer,dt as RouterPackage,ue as SameSite,G as ServerResponseConsumer,de as SetCookie,$e as StringBodyConsumer,Fe as StringBodyParser,pt as TODO,b as TumauBaseResponse,j as TumauHandlerResponse,S as TumauRequest,k as TumauResponse,D as TumauUpgradeResponse,Z as UpgradeHeadConsumer,W as UpgradeSocketConsumer,Ye as UrlParser,Xe as UrlParserConsumer,O as compose,K as createServer};
