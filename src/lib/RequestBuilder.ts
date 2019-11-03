import axios, { AxiosRequestConfig, Method } from 'axios';

export default class RequestBuilder {

    config: AxiosRequestConfig = {};

    constructor(scheme: string, baseUrl: string) {
        this.setUpBaseUrl(scheme, baseUrl)
    }

    request(method: Method, path: string, args: any, request: any, cb: any) {
        this.setMethod(method);
        this.addPathToUrl(path);
        this.addParametersToRequest(request, args)
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

    encodeObject(parameters: any) {
        return Object.keys(parameters).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(parameters[k])}`).join('&');
    }

    addParametersToRequest(request: any, args: any) {

        // We have to group our parameters by their location in the request,
        // after that we can send them to the appropriate function to get added.

        // From the spec
        const locationTypes: any = {
            path: {},
            header: {},
            query: {},
            formData: {},
            body: {}
        };

        Object.keys(args).forEach((key: string) => {
            // "Find the value of the property 'in' from the parameter with name == key"
            let location = request.parameters.filter((param: any) => {return param.name === key})[0].in;

            // Add parameter to appropriate collection
            locationTypes[location][key] = args[key];
        });

        // Now we can add each type of parameter to the request
        // This isn't super DRY, but we'd have to have a mapping between the location and the appropriate
        // adder function anyway, and considering the amount of object.key iteration we already have going
        // on, I think this is more readable.
        this.addParameterFromPathNice(locationTypes.path);
        this.addParameterFromHeaderNice(locationTypes.header);
        this.addParametersFromQueryNice(locationTypes.query);
        this.addParametersFromForm(locationTypes.formData);
        this.addParameterFromBodyNice(locationTypes.body);
    }

    addParameterFromBodyNice(parameters: any) {
        try {
            this.config.data = JSON.parse(parameters.body);
        } catch (error) {
            this.config.data = {};
        }
    }

    addParametersFromForm(params: any) {
        if (Object.keys(params).length) {
            this.config.baseURL += '?';
            this.config.baseURL += this.encodeObject(params);
        }
    }

    addParametersFromQueryNice(params: any) {
        if (Object.keys(params).length) {
            this.config.baseURL += '?';
            this.config.baseURL += this.encodeObject(params);
        }
    }

    addParameterFromHeaderNice(parameters: any) {
        if (!this.config.headers) {
            this.config.headers = {}
        }

        Object.keys(parameters).forEach((key: any) => {
            this.config.headers[key] = parameters[key];
        });
    }

    addParameterFromPathNice(parameter: any){
        Object.keys(parameter).forEach((key: any) => {
            if (this.config.baseURL) {
                this.config.baseURL = this.config.baseURL.replace(`{${key}}`, parameter[key]);
            }
        });
    }

    static convertServerResponseToResponseState(response: any): RequestResponseState {
        return {
            status: response ? response.status : '',
            statusText: response ? response.statusText : '',
            data: response ? response.data : {}
        };
    }
}

export interface RequestResponseState {
    status: string,
    statusText: string,
    data: object
}
