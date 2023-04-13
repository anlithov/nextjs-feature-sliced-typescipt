import { BodyRequest, IHttpConfig, IMap } from './http-base.types';
import { HttpService } from './http.service';

export class EnhancedWithAuthHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tokenSlug: string,
    private readonly addonAuthorizations?: {
      headerKey: string;
      localStorageKey: string;
    }[],
  ) {}

  public createQueryLink(base: string, parameters: IMap) {
    return this.httpService.createQueryLink(base, parameters);
  }

  private attachAuthHeader(config: IHttpConfig): IHttpConfig {
    return {
      ...config,
      headers: { ...config.headers, ...this.populateTokenToHeaderConfig() },
    };
  }

  private populateTokenToHeaderConfig(): object {
    const addonHeaders: Record<string, string> = {};
    if (this.addonAuthorizations) {
      for (const addon of this.addonAuthorizations) {
        addonHeaders[addon.headerKey] = localStorage.getItem(addon.localStorageKey) ?? '';
      }
    }
    return {
      Authorization: `Bearer ${localStorage.getItem(this.tokenSlug)}` ?? '',
      ...addonHeaders,
    };
  }

  public get<R>(url: string, config: IHttpConfig = {}): Promise<R> {
    return this.httpService.get<R>(url, this.attachAuthHeader(config));
  }

  public post<Response, Data extends BodyRequest>(
    url: string,
    data: Data,
    config: IHttpConfig = {},
  ): Promise<Response> {
    return this.httpService.post<Response, Data>(url, data, this.attachAuthHeader(config));
  }

  public put<Response, Data extends BodyRequest>(url: string, data: Data, config: IHttpConfig = {}): Promise<Response> {
    return this.httpService.put<Response, Data>(url, data, this.attachAuthHeader(config));
  }

  public patch<Response, Data extends BodyRequest>(
    url: string,
    data: Data,
    config: IHttpConfig = {},
  ): Promise<Response> {
    return this.httpService.patch<Response, Data>(url, data, this.attachAuthHeader(config));
  }

  public delete<Response>(url: string, config: IHttpConfig = {}): Promise<Response> {
    return this.httpService.delete<Response>(url, this.attachAuthHeader(config));
  }
}
