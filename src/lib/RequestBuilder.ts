import axios, { AxiosRequestConfig, Method } from 'axios';

export default class RequestBuilder {

    config: AxiosRequestConfig = {};

    constructor(scheme: string, baseUrl: string) {
        this.setUpBaseUrl(scheme, baseUrl)
    }

    request(method: Method, path: string, args: any, cb: any, request: any) {
        this.setMethod(method);
        this.addPathToUrl(path);
        this.addParametersToRequest(request, args);
        this.sendRequest(cb);
    }

    setUpBaseUrl(scheme: string, baseUrl: string) {
        this.config.baseURL = scheme.toLocaleLowerCase() + '://' + baseUrl;
    }

    sendRequest(callback: any) {
        axios(this.config)
            .then((response: any) => {
                callback(RequestBuilder.convertServerResponseToResponseState(response), this.config)
            })
            .catch((error: any) => {
                callback(RequestBuilder.convertServerResponseToResponseState(error.response), this.config)
            });
    }

    setMethod(method: Method) {
        this.config.method = method;
    }

    addPathToUrl(path: any) {
        this.config.baseURL += path;
    }

    addParameterFromPath(value: any, param: string){
        if (this.config.baseURL) {
            this.config.baseURL = this.config.baseURL.replace(`{${param}}`, value);
        }
    }

    addParameterFromHeader(name: string, value: string) {
        if (!this.config.headers) {
            this.config.headers = {}
        }

        this.config.headers[name] = value;
    }

    addParametersFromQuery(params: any) {
        this.config.baseURL += '?';
        this.config.baseURL += this.encodeObject(params);
    }

    addParametersFromForm(params: any) {
        this.config.baseURL += '?';
        this.config.baseURL += this.encodeObject(params);
    }

    addParameterFromBody(params: any, args: any) {
        try {
            this.config.data = JSON.parse(args[params.name]);
        } catch (error) {
            this.config.data = {};
        }
    }

    encodeObject(parameters: any) {
        return Object.keys(parameters).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(parameters[k])}`).join('&');
    }

    addParametersToRequest(request: any, args: any) {
        if(request.parameters.length) {
            let queryParams: any = {};
            let formParams: any = {};

            request.parameters.forEach((param: any) => {
                switch (param.in) {
                    case 'path':
                        this.addParameterFromPath(args[param.name], param.name);
                        break;
                    case 'header':
                        this.addParameterFromHeader(param.name, args[param.name]);
                        break;
                    case 'query':
                        if (args[param.name]) {
                            queryParams[param.name] = args[param.name];
                        }
                        break;
                    case 'formData':
                        if (args[param.name]) {
                            queryParams[param.name] = args[param.name];
                        }
                        break;
                    case 'body':
                        this.addParameterFromBody(param, args);
                        break;
                }
            });

            if (Object.keys(formParams).length) {
                this.addParametersFromForm(formParams);
            }

            if (Object.keys(queryParams).length) {
                this.addParametersFromQuery(queryParams);
            }
        }
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
