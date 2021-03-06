import { AfterFetchHook, ErrorWithErrorAttribute } from './types';
import logger from 'loglevel';

/**
 * Fetch API treats all successful network requests as ok, even if there are internal server errors and stuff
 * This middleware looks at the HTTP Status code and create errors based on that
 *
 * This middleware also logs special errors generated by the Zend based API in hip-new
 */
export const withHttpErrors: AfterFetchHook = async (response, data: any) => {
  if (response.status !== 200) {
    logger.error(
      `message: ${data.message}`,
      `error: ${data.error}\n`,
      `file: ${data.file}\n`,
      `line: ${data.line}\n`,
      { trace: data.trace, html: data.html }
    );

    const err: ErrorWithErrorAttribute = new Error(data.message);
    err.error = data;
    throw err;
  }
  return [response, data];
};
