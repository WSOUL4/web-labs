class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const ValidationError = new CustomError(400, 'Это ошибка в атрибутах!');
const NotFoundError = new CustomError(
  400,
  'Результата с такими параметрами не найдено :(',
);

function valErr(res) {
  res.status(400).send({ message: 'Bad data, check fields' });
}

function emptyErr(res) {
  res.status(404).send({ message: 'Not found' });
}

export {
  ValidationError,
  NotFoundError,
  CustomError,
  valErr,
  emptyErr,
  /*BackendError */
};
