import axios, {
    AxiosAdapter, AxiosBasicCredentials, AxiosProxyConfig, AxiosRequestConfig, AxiosTransformer,
    CancelToken, Method
} from 'axios';

export default class RequestBuilder {

    config: AxiosRequestConfig = {};

    constructor(api: any) {
        let baseUrl = 'https://' + api.host + api.basePath;

        this.config.baseURL = baseUrl;

    }

    request(method: Method, url: string) {
        console.log(url)
        this.config.baseURL += this.cleanUrl(url) + 1;
        this.config.method = method;

        console.log(this.config)

        return axios(this.config);
    }

    cleanUrl(url: string) {
        return url.slice(0, url.indexOf('{'))
    }
}

//
// export type Method =
//     | 'get' | 'GET'
//     | 'delete' | 'DELETE'
//     | 'head' | 'HEAD'
//     | 'options' | 'OPTIONS'
//     | 'post' | 'POST'
//     | 'put' | 'PUT'
//     | 'patch' | 'PATCH'
//
// export type ResponseType =
//     | 'arraybuffer'
//     | 'blob'
//     | 'document'
//     | 'json'
//     | 'text'
//     | 'stream'
//
// export interface AxiosRequestConfig {
//     url?: string;
//     method?: Method;
//     baseURL?: string;
//     transformRequest?: AxiosTransformer | AxiosTransformer[];
//     transformResponse?: AxiosTransformer | AxiosTransformer[];
//     headers?: any;
//     params?: any;
//     paramsSerializer?: (params: any) => string;
//     data?: any;
//     timeout?: number;
//     withCredentials?: boolean;
//     adapter?: AxiosAdapter;
//     auth?: AxiosBasicCredentials;
//     responseType?: ResponseType;
//     xsrfCookieName?: string;
//     xsrfHeaderName?: string;
//     onUploadProgress?: (progressEvent: any) => void;
//     onDownloadProgress?: (progressEvent: any) => void;
//     maxContentLength?: number;
//     validateStatus?: (status: number) => boolean;
//     maxRedirects?: number;
//     socketPath?: string | null;
//     httpAgent?: any;
//     httpsAgent?: any;
//     proxy?: AxiosProxyConfig | false;
//     cancelToken?: CancelToken;
// }
