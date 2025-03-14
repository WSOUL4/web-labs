class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const ValidationError = new CustomError(400, 'Это ошибка в атрибутах!');
const NotFoundError = new CustomError(
  404,
  'Результата с такими параметрами не найдено :(',
);

function valErr(res: {
  status: (code: number) => { send: (body: object) => void };
}) {
  res.status(400).send({ message: 'Bad data, check fields' });
}

function emptyErr(res: {
  status: (code: number) => { send: (body: object) => void };
}) {
  res.status(404).send({ message: 'Not found' });
}

export {
  ValidationError,
  NotFoundError,
  CustomError,
  valErr,
  emptyErr,
  // BackendError
};
