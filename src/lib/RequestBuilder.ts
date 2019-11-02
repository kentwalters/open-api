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

    request(method: Method, url: string, args: any) {
        this.config.baseURL += RequestBuilder.buildUrlWithParams(url, args)
        this.config.method = method;

        console.log(this.config)

        return axios(this.config);
    }

    static buildUrlWithParams(url: string, args: any) {
        let startOfBraces = url.indexOf('{');

        if (startOfBraces === -1) {
            return url;
        }

        const endOfBraces = url.indexOf('}');

        const parameterName = url.slice(startOfBraces + 1, endOfBraces)

        return url.replace('{' + parameterName + '}', args[parameterName]);
    }
}
