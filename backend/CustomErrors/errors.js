class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
const ValidationError =  new CustomError(400, 'Это ошибка в атрибутах!');
const NotFoundError = new CustomError(400,"Результата с такими параметрами не найдено :(");





export {ValidationError,
    NotFoundError
    /*BackendError */
}