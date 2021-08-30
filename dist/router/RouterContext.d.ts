import { HttpMethod } from '../core';
import { Chemin } from 'chemin';
export interface Params {
    [key: string]: unknown;
}
export interface RouterContext {
    params: Params;
    notFound: boolean;
    pattern: Chemin | null;
    get<P>(chemin: Chemin<P>): P | null;
    getOrFail<P>(chemin: Chemin<P>): P;
    has(chemin: Chemin): boolean;
}
export declare const RouterContext: import("miid/dist/Context").Context<RouterContext, false>;
export declare const RouterConsumer: import("miid/dist/Context").ContextConsumer<RouterContext, false>;
export declare const RouterAllowedMethodsContext: import("miid/dist/Context").Context<Set<HttpMethod>, false>;
export declare const RouterAllowedMethodsConsumer: import("miid/dist/Context").ContextConsumer<Set<HttpMethod>, false>;
