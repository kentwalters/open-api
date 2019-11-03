export default class ApiParser {

    getBaseUrl(api: any) {
        return api.host + api.basePath;
    }

    getPathsForMethod(api: any) {
        const pathList: any[] = [];

        Object.keys(api.paths).forEach(path => {
            Object.keys(api.paths[path]).forEach(method => {

                const request: any = {};
                request.method = method;
                request.path = path;
                request.details = api.paths[path][method];

                if (!request.details.parameters) {
                    request.details.parameters = [];
                }

                pathList.push(request)
            })
        });

        return pathList;
    }
}
