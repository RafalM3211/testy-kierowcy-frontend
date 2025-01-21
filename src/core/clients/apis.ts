import { createClient } from "./client";
import type {
  UnauthorizedError,
  BadRequestError,
  RegisterInterceptorsType,
} from "./types";

const apiUrl = process.env.REACT_APP_SERVER_URL;
if (!apiUrl) {
  throw new Error("apiUrl environment variable not set");
}

const primaryApi = createClient(apiUrl, fetch);

const primaryInterceptors = {
  response: async (response: Response) => {
    if (isInternalServerError(response.status)) {
      window.location.assign("/error/500");
    }
    if (isForbidden(response.status)) {
      window.location.assign("/login");
    }
    if (isBadRequest(response.status)) {
      const exceptionData: BadRequestError = await response.json();
      throw exceptionData;
    }
    if (isUnauthorized(response.status)) {
      const exceptionData: UnauthorizedError = await response.json();
      throw exceptionData;
    }
    if (isOtherError(response.status)) {
      throw new Error("Other error: " + response.statusText);
    }
    return response;
  },
  responseError: (error: Error) => {
    window.location.assign("/error/500");
  },
} satisfies RegisterInterceptorsType;

primaryApi.registerInterceptors(primaryInterceptors);

const noRedirectApi = createClient(apiUrl, fetch);
const noRedirectInterceptors = {
  response: async (response: Response) => {
    if (!isOk(response.status)) {
      const exceptionData = await response.json();
      throw exceptionData;
    }
    return response;
  },
};
noRedirectApi.registerInterceptors(noRedirectInterceptors);

const isInternalServerError = (statusCode: number) => {
  return statusCode === 500;
};

const isForbidden = (statusCode: number) => {
  return statusCode === 403;
};

const isBadRequest = (statusCode: number) => {
  return statusCode === 400;
};
const isUnauthorized = (statusCode: number) => {
  return statusCode === 401;
};

const isOtherError = (statusCode: number) => {
  return statusCode >= 400;
};

const isOk = (statusCode: number) => {
  return statusCode >= 200 && statusCode < 300;
};

export { primaryApi, noRedirectApi };
