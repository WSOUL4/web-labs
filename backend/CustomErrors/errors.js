class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
const ValidationError =  new CustomError(400, 'Это ошибка в атрибутах!');
const NotFoundError = new CustomError(400,"Результата с такими параметрами не найдено :(");

function ValErr(res) {
    res.status(400).send({message:'Not unique email  or id'});
}



export {ValidationError,
    NotFoundError,
    CustomError,
    ValErr,
    /*BackendError */
}