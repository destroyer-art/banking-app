import { Request, ResponseToolkit } from "@hapi/hapi";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5, // max number of the requests
  duration: 1, // 1 second
});

export const rateLimiterMiddleware = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    await rateLimiter.consume(request.info.remoteAddress);
    return h.continue;
  } catch (rejRes) {
    return h.response("Too Many Requests").code(429).takeover();
  }
};
