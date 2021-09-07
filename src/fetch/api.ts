import {
  AfterFetchHook,
  BeforeFetchHook,
  OnErrorHook,
} from "./middleware/types";
import axios from "axios";

export function parseParam(param: object | string) {
  return typeof param === "object" ? JSON.stringify(param) : param;
}

/**
 * Static store for before and after hooks for the fetcher
 */
const hooks: {
  beforeFetch: BeforeFetchHook[];
  afterFetch: AfterFetchHook[];
  onError: OnErrorHook[];
} = {
  beforeFetch: [],
  afterFetch: [],
  onError: [],
};

/**
 * Core function which actually calls the fetch API
 */
async function api(url: any, options: any) {
  return axios({
    url,
    data: options.body,
    headers: options.headers,
    method: options.method,
  });
}

/**
 * Register a middleware to be run before a fetch call
 */
export function addHookToRunBeforeFetch(handler: BeforeFetchHook) {
  hooks.beforeFetch.push(handler);
}

/**
 * Register a middleware to be run after a fetch call
 */
export function addHookToRunAfterFetch(handler: AfterFetchHook) {
  hooks.afterFetch.push(handler);
}

/**
 * Register a middleware to be run on fetch errors
 */
export function addHookToRunOnError(handler: OnErrorHook) {
  hooks.onError.push(handler);
}

/**
 * Public facing version of the fetch API which runs middleware before and after the fetch call as applicable
 */
export async function doFetch(url: any, options: any) {
  for (const handler of hooks.beforeFetch) {
    [url, options] = handler(url, options);
  }

  let response;
  let data = {};

  try {
    response = await api(url, options);
  } catch (e: any) {
    let err: Error = e;
    for (const handler of hooks.onError) {
      [err] = handler(e);
    }
    throw err;
  }

  for (const handler of hooks.afterFetch) {
    [response, data] = await handler(response, data);
  }

  return [response, data];
}
