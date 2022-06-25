import store, { RootDispatch } from "../../store";
import { convertBody } from "./convert-body";
import { RequestConfig, RequestHeaders } from "./types";

const BASE_URL = "http://localhost:3001"

function getAuthorizationHeaders(): RequestHeaders {
  const token = "ASDF"
  return {
    Authorization: `Token ${token}`,
  };
}

/**
 * Basic API client
 */
export async function request(url: string, config?: RequestConfig) {
  const {
    anonymous = false,
    method = "GET",
    params,
    json,
    token,
  } = config || ({} as RequestConfig);

  const headers: RequestHeaders = anonymous ? {} : getAuthorizationHeaders();

  const {
    body,
    url: fullURL,
    headers: requestHeaders = {},
  } = convertBody(`${BASE_URL}${url}`, {
    params,
    method,
    json,
  });

  const response = await fetch(fullURL, {
    mode:"no-cors",
    headers: {
      ...headers,
      ...requestHeaders,
      ...token,
    },
    method,
    body,
  });

  if (!response.ok) {
    // on a 401 we will throw away the token and redirect the user to the login page (e.g. for expired token)
    // currently, we will also logout the user, when we want to access a resource he has no access to.
    // In the future, we've to handle this case differently (show a message, that the user do not have access to the resource).
    if (response.status === 401) {
      await getDispatch().profile.removeProfileAndToken();

      return null;
    }

    if (response.status === 400) {
      // log the request error to sentry, except when it is a 400 from the login page (wrong username and password)
      const is_wrong_credentials_request =
        url.includes("auth-token") && response.status === 400;

      if (!is_wrong_credentials_request) {
        console.error("something went wrong")
      }
    }
  }

  return response;
}

function getDispatch(): RootDispatch {
  return store.dispatch as RootDispatch;
}
