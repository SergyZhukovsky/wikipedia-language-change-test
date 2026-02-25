import { request as playwrightRequest, type Cookie } from '@playwright/test';
import { config } from '../config';

/**
 * Authenticate via MediaWiki clientlogin API and return session cookies.
 */
export async function wikiLogin(username: string, password: string): Promise<Cookie[]> {
  const apiUrl = `${config.baseURL}${config.apiPath}`;
  const apiContext = await playwrightRequest.newContext({ baseURL: config.baseURL });

  try {
    // Get login token
    const tokenResponse = await apiContext.get(apiUrl, {
      params: { action: 'query', meta: 'tokens', type: 'login', format: 'json' },
    });
    const tokenData = await tokenResponse.json();
    const loginToken = tokenData.query.tokens.logintoken;

    // Login via clientlogin
    const loginResponse = await apiContext.post(apiUrl, {
      form: {
        action: 'clientlogin',
        username,
        password,
        loginreturnurl: `${config.baseURL}/`,
        logintoken: loginToken,
        format: 'json',
      },
    });
    const loginData = await loginResponse.json();

    if (loginData.clientlogin?.status !== 'PASS') {
      throw new Error(
        `Login failed: ${loginData.clientlogin?.status ?? 'unknown'} — ${loginData.clientlogin?.message ?? JSON.stringify(loginData)}`,
      );
    }

    const storageState = await apiContext.storageState();
    return storageState.cookies;
  } finally {
    await apiContext.dispose();
  }
}
