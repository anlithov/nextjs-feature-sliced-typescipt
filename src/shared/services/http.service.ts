import { IHttpClient, IHttpConfig, IMap, IResponse } from './http-base.types';

export class HttpService {
  constructor(
    private fetchingService: IHttpClient,
    private baseUrl = process.env.NEXT_PUBLIC_BASE_URL,
  ) {}

  public createQueryLink(base: string, args: IMap) {
    let url = `${base}?`;
    Object.keys(args).forEach((parameter, index) => {
      if (args[parameter]) {
        url = url + `${index > 0 ? '&' : ''}${parameter}=${args[parameter]}`;
      }
    });
    return url;
  }

  public populateContentTypeHeaderConfig() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  private checkResponseStatus<T>(result: IResponse<T>) {
    if (result.status >= 400 && result.status < 600) {
      const errorData = {
        response: {
          status: result.status,
          data: result.data,
        },
      };

      throw new Error(JSON.stringify(errorData));
    }
  }

  public async get<T>(url: string, config?: IHttpConfig) {
    return this.fetchingService
      .get<IResponse<T>>(this.getFullApiUrl(url), {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig(),
        },
      })
      .then((result) => {
        this.checkResponseStatus(result);
        return result.data;
      });
  }

  public async post<T, D>(url: string, data: D, config?: IHttpConfig) {
    return this.fetchingService
      .post<IResponse<T>, D>(this.getFullApiUrl(url), data, {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig(),
        },
      })
      .then((result) => {
        this.checkResponseStatus(result);
        return result.data;
      });
  }

  public put<T, D>(url: string, data: D, config?: IHttpConfig) {
    return this.fetchingService
      .put<IResponse<T>, D>(this.getFullApiUrl(url), data, {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig(),
        },
      })
      .then((result) => {
        this.checkResponseStatus(result);
        return result.data;
      });
  }

  public patch<T, D>(url: string, data: D, config?: IHttpConfig) {
    return this.fetchingService
      .patch<IResponse<T>, D>(this.getFullApiUrl(url), data, {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig(),
        },
      })
      .then((result) => {
        this.checkResponseStatus(result);
        return result.data;
      });
  }

  public delete<T>(url: string, config?: IHttpConfig) {
    return this.fetchingService
      .delete<IResponse<T>>(this.getFullApiUrl(url), {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig(),
        },
      })
      .then((result) => {
        this.checkResponseStatus(result);
        return result.data;
      });
  }
}
