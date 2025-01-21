import type {
  ResponseInterceptor,
  ErrorInterceptor,
  RegisterInterceptorsType,
} from "./types";

export const createClient = (baseUrl: string, api = fetch) => {
  let interceptRequest = (url: string, options: RequestInit) => {
    return { interceptedUrl: url, interceptedOptions: options };
  };
  let interceptResponse: ResponseInterceptor = async (response: Response) =>
    response;
  let interceptError: ErrorInterceptor = (error: Error) => {};

  return {
    get: async (url: string, options: RequestInit = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, interceptedOptions);
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        }
        throw exception;
      }
    },
    post: async (url: string, values: object, options: RequestInit = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        }
        throw exception;
      }
    },
    put: async (url: string, values: object, options: RequestInit = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else {
          throw exception;
        }
      }
    },
    delete: async (url: string, options: RequestInit = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, {
          method: "DELETE",
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else throw exception;
      }
    },
    registerInterceptors: ({
      request,
      response,
      responseError,
    }: RegisterInterceptorsType) => {
      if (!!request) interceptRequest = request;
      if (!!response) interceptResponse = response;
      if (!!responseError) interceptError = responseError;
    },
  };
};
