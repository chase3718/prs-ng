export class JsonResponse {
    data: object;
    errors: object;
    meta: object;

    constructor(data: object, errors: object, meta: object) {
        this.data = data;
        this.errors = errors;
        this.meta = meta;
    }
}
