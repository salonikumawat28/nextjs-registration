export default class RequestError extends Error {
  private response: Record<string, any>;

  constructor(response: Record<string, any>) {
    super("RequestError");
    this.response = response;
  }
}
