export default class ApiParser {

    getTags(api: any) {
        if (api.tags) {
            return api.tags;
        }

        // const tags: any[] = [];
        //
        // api.paths.forEach((path: any) => {
        //     Object.values(path).forEach((pathMethod: any) => {
        //         console.log(pathMethod)
        //         if (pathMethod['tags']) {
        //             tags.push(pathMethod['tags'][0])
        //         }
        //     })
        // });
        //
        // if (tags.length) {
        //     return tags;
        // }

        return [];
    }

    hasTags(api: any) {
        return api.tags || api.getTags().length;
    }

    getPathsForMethod(api: any) {
        let trans: any[] = [];

        Object.keys(api.paths).forEach((path: any) => {

            Object.keys(api.paths[path]).forEach(method => {
                let ob: any = {};
                ob.method = method;
                ob.path = path;
                ob.details = api.paths[path][method];
                ob.tag = api.paths[path][method]['tags'][0];

                trans.push(ob)

            })
        });

        return trans;
    }
}
