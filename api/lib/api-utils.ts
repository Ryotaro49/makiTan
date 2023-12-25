import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  ClientError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../types/errors";

export function throwIfEnvUndefined(envName: string) {
  if (!process.env[envName]) {
    throw new Error(`${envName} is required`);
  }
}

export function throwIfParamIsMissing(object: Object, paramName: string) {
  if (!(paramName in object)) {
    throw new Error(`${paramName} is required`);
  }
}

export function throwIfAnyParamIsMissing(object: Object, paramNames: string[]) {
  paramNames.forEach((paramName) => throwIfParamIsMissing(object, paramName));
}

export function getStatusCode(error: Error) {
  const statusCode =
    error instanceof ClientError
      ? 400
      : error instanceof UnauthorizedError
        ? 401
        : error instanceof ConflictError
          ? 409
          : error instanceof NotFoundError
            ? 404
            : 500;
  return statusCode;
}

export function createResponseObject(result: Object): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}

export function createErrorResponseObject(error: Error): APIGatewayProxyResult {
  return {
    statusCode: getStatusCode(error),
    body: JSON.stringify(error, ["message"]),
  };
}

export function extractPathParameter(
  event: APIGatewayProxyEvent,
  paramName: string
): string {
  const param = event.pathParameters?.[paramName];
  if (!param) {
    throw new Error(`${paramName} is required`);
  }
  return param;
}

export function extractQueryParameter(
  event: APIGatewayProxyEvent,
  paramName: string,
  isRequired = true
): string {
  const param = event.queryStringParameters?.[paramName];
  if (isRequired && !param) {
    throw new Error(`${paramName} is required`);
  }
  return param ?? "";
}

export function extractQueryParameters<T>(event: APIGatewayProxyEvent): T {
  const param = event.queryStringParameters || {};
  return param as T;
}

export function extractBody<T>(event: APIGatewayProxyEvent): T {
  throwIfParamIsMissing(event, "body");
  const body = JSON.parse(event.body ?? "{}");
  return body as T;
}

export function extractHeader(
  event: APIGatewayProxyEvent,
  headerName: string
): string | undefined {
  return event.headers?.[headerName];
}

// type CognitoAccessTokenPayload = JwtPayload & {
//   username: string | undefined;
// };

// export function extractBearerToken(event: APIGatewayProxyEvent): string {
//   const token = extractHeader(event, "authorization")?.split("Bearer ")[1];
//   if (!token) {
//     throw new UnauthorizedError(`Authorization token is required`);
//   }
//   return token;
// }

// export function decodeJwtToken(token: string): CognitoAccessTokenPayload {
//   const decoded = jwt_decode<CognitoAccessTokenPayload>(token);
//   return decoded;
// }

// export function getAuthorizationTokenField<T = any>(
//   event: APIGatewayProxyEvent,
//   field: string
// ): T | undefined {
//   const token = extractBearerToken(event);
//   const decoded = decodeJwtToken(token);
//   return decoded[field];
// }
