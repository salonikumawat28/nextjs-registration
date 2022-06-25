import { convertURL } from "./convert-url";
import {
  RequestConfig,
  RequestHeaders,
  RequestMethod,
  RequestParams,
} from "./types";

const fromEntries = require("fromentries");

interface Converted {
  url: string;
  body?: BodyInit;
  headers?: RequestHeaders;
}

/**
 * Convert passed params to the valid FormData instance
 */
function toFormData(params: RequestParams): FormData {
  const fd = new FormData();

  const bodyParams = Object.entries(params).filter(([, v]) =>
    ["string", "number"].includes(typeof v)
  );

  bodyParams.forEach(([k, v]) => {
    fd.append(k, v.toString());
  });

  return fd;
}

/**
 * Convert request params for the normal
 */
export function convertBody(
  url: string,
  { params, method = "GET", json }: RequestConfig
): Converted {
  if (params) {
    const withoutBody = (["GET", "HEAD"] as RequestMethod[]).includes(method);

    const qs = withoutBody
      ? // for the GET|HEAD requests we will take all params,
        // since for fetch API those requests can't contain body
        params
      : // otherwise let's pass rest complex data like an array
        fromEntries(
          Object.entries(params).filter(([, s]) => typeof s === "object")
        );

    url = convertURL(url, qs);

    return {
      url,
      body: withoutBody ? undefined : toFormData(params),
    };
  }

  if (json) {
    return {
      url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(json),
    };
  }

  return {
    url,
  };
}
