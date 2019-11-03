import axios, { AxiosRequestConfig, Method } from 'axios';

export default class RequestBuilder {

    config: AxiosRequestConfig = {};

    constructor(scheme: string, baseUrl: string) {
        this.config.baseURL = scheme.toLocaleLowerCase() + '://' + baseUrl;
    }

    addParametersToPath(value: any, param: string){
        if (this.config.baseURL) {
            this.config.baseURL = this.config.baseURL.replace(`{${param}}`, value);
        }
    }

    addParametersToHeader(name: string, value: string) {
        if (!this.config.headers) {
            this.config.headers = {}
        }

        this.config.headers[name] = value;
    }

    addParametersToQuery(params: any) {
        this.config.baseURL += '?';
        this.config.baseURL += Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    }

    addParametersToForm(params: any) {
        this.config.baseURL += '?';
        this.config.baseURL += Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    }

    request(method: Method, path: string, args: any, cb: any, request: any) {
        this.config.method = method;

        this.config.baseURL += path;

        if (request.parameters.length) {
            let queryParams: any = {};
            let formParams: any = {};

            request.parameters.forEach((param: any) => {
                switch (param.in) {
                    case 'path':
                        this.addParametersToPath(args[param.name], param.name);
                        break;
                    case 'header':
                        this.addParametersToHeader(param.name, args[param.name]);
                        break;
                    case 'query':
                        queryParams[param.name] = args[param.name];
                        break;
                    case 'formData':
                        queryParams[param.name] = args[param.name];
                        break;
                }
            });

            if (Object.keys(formParams).length) {
                this.addParametersToForm(formParams);
            }

            if (Object.keys(queryParams).length) {
                this.addParametersToQuery(queryParams);
            }
        }

        axios(this.config)
            .then((response: any) => {
                cb(RequestBuilder.convertServerResponseToResponseState(response), this.config)
            })
            .catch((error: any) => {
                cb(RequestBuilder.convertServerResponseToResponseState(error.response), this.config)
            });
    }

    static convertServerResponseToResponseState(response: any): RequestResponseState {
        if (!response) {
            return {
                status: '000',
                statusText: 'The error was with this application, not your request',
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
