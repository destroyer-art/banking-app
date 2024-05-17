import { Request, ResponseToolkit } from "@hapi/hapi";

export const setSecurityHeadersMiddleware = (
  request: Request,
  h: ResponseToolkit
) => {
  request.headers["X-DNS-Prefetch-Control"] = "off";
  request.headers["X-Frame-Options"] = "DENY";
  request.headers["Strict-Transport-Security"] =
    "max-age=15552000; includeSubDomains";
  request.headers["X-XSS-Protection"] = "0";
  return h.continue;
};
