export type RequestParams =
  | Record<string, string | number>
  | Record<string, string[]>;

export type RequestHeaders = Record<string, string>;

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestConfig {
  method?: RequestMethod;
  params?: RequestParams;
  json?: Object;
  anonymous?: boolean;
  token?: { Authorization: string };
}
