import axios, { AxiosRequestConfig, Method } from 'axios';

export default class RequestBuilder {

    config: AxiosRequestConfig = {};

    constructor(baseUrl: string) {
        this.config.baseURL = baseUrl;
    }

    static buildUrlWithParams(url: string, args: any) {
        let startOfBraces = url.indexOf('{');

        if (startOfBraces === -1) {
            return url;
        }

        const endOfBraces = url.indexOf('}');
        const parameterName = url.slice(startOfBraces + 1, endOfBraces);

        return url.replace('{' + parameterName + '}', args[parameterName]);
    }

    request(method: Method, url: string, args: any, cb: any, accepts: string[]) {
        this.config.baseURL += RequestBuilder.buildUrlWithParams(url, args);
        this.config.method = method;

        if (method === 'post' || method === 'put') {
            this.config.data = args;
        }

        console.log(this.config)

        axios(this.config)
            .then((response: any) => {
                cb(RequestBuilder.convertServerResponseToResponseState(response))
            })
            .catch((error: any) => {
                cb(RequestBuilder.convertServerResponseToResponseState(error.response))
            });
    }

    static convertServerResponseToResponseState(response: any): RequestResponseState {
        if (!response) {
            return {
                status: '000',
                statusText: 'The Error was with this application, not your request',
                data: {}
            }
        }

        return {
            status: response.status,
            statusText: response.statusText,
            data: response.data
        };
    }
}

export interface RequestResponseState {
    status: string,
    statusText: string,
    data: object
}
