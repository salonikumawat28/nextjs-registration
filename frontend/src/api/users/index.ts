import { request } from "../request";
import { RegisterUserData } from "./types";

export * from "./types";

export async function registerUserApi(
  data: RegisterUserData
): Promise<any> {
  try {
    return await request("/register/", {
      method: "POST",
      json: data,
    });
  } catch (e) {
    return e;
  }
}

