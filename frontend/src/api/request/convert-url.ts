import { RequestParams } from "./types";

function arrayToQS(key: string, list: string[]): string {
  return list.map((v) => `${key}=${v}`).join("&");
}

export function convertURL(url: string, params: RequestParams): string {
  const qs = Object.entries(params)
    .reduce((acc, [k, v]) => {
      const element = Array.isArray(v) ? arrayToQS(k, v) : `${k}=${v}`;

      return [...acc, element];
    }, [] as string[])
    .join("&");

  if (qs) {
    const delimiter = url.includes("?") ? "&" : "?";

    return url + delimiter + qs;
  }

  return url;
}
