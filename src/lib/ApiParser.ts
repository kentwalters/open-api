export default class ApiParser {

    getBaseUrl(api: any) {
        return api.host + api.basePath;
    }

    getPathsForMethod(api: any) {
        let trans: any[] = [];

        Object.keys(api.paths).forEach(path => {
            Object.keys(api.paths[path]).forEach(method => {
                let request: any = {};
                request.method = method;
                request.path = path;
                request.details = api.paths[path][method];

                if (!request.details.parameters) {
                    request.details.parameters = [];
                }

                if (api.paths[path][method]['tags']) {
                    request.tag = api.paths[path][method]['tags'][0];
                }

                trans.push(request)

            })
        });

        return trans;
    }
}
