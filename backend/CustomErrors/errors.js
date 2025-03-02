const ValidationError = new TypeError("Ошибка в параметрах запроса(атрибутах)!");

const NotFoundError = new TypeError("Результата с такими параметрами не найдено :(");
//const BackendError= new InternalError("Ошибка на стороне сервера :(");







export {ValidationError,
    NotFoundError
    /*BackendError */
}