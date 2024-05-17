import { Request, ResponseToolkit } from "@hapi/hapi";
import { JwtPayload } from "auth/types/jwt-payload";
import { decodeJwtToken } from "../auth/services/auth.service";
import { ErrorMessages } from "../shared/constants/error-messages";

export const extractTokenMiddleware = (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const authorizationHeader: string = request.headers["authorization"];

    if (!authorizationHeader) {
      return h
        .response(ErrorMessages.TOKEN_NOT_FOUND_IN_HEADERS)
        .code(403)
        .takeover();
    }

    const token = authorizationHeader.split(" ")[1];

    const decodedToken: JwtPayload = decodeJwtToken(token);

    request.auth["customer"] = decodedToken;

    return h.continue;
  } catch (rejRes) {
    return h
      .response(ErrorMessages.TOKEN_VERIFICATION_ERROR)
      .code(403)
      .takeover();
  }
};
