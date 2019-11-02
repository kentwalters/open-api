export default class SB {

    getParameterString(param: any) {
        let str = '';

        str += param.required? 'Required' : 'Optional';

        str += param.type ? ' | ' + param.type : '';

        str += param.format ? ': ' + param.format : '';

        return str
    }
}
