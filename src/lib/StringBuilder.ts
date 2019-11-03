export default class SB {

    getParameterString(param: any) {
        let str = '';

        str += param.required? 'Required' : 'Optional';

        str += param.type ? ' | ' + param.type : '';

        str += param.format ? ': ' + param.format : '';

        return str
    }

    mapMethodToBadgeVariant(method: string) {
        switch (method) {
            case 'get':
                return 'success';
            case 'post':
                return 'info';
            case 'delete':
                return 'danger';
            case 'put':
                return 'warning';
            default:
                return 'secondary';
        }
    }
}
