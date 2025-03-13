/**
 *
 *  @swagger
 * /users/?:
 *   get:
 *     summary: Получить пользователя с айди из параметра
 *
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди пользователя
 *         schema:
 *           type: string
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     404:
 *         description: Ответ с текстом о ненайденых строках
 *     500:
 *         description: Ошибка при выполнении запроса
 *   post:
 *     summary: Отправить данные для загрузки в БД
 *
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         description: ФИО пользователя
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         required: false
 *         description: Почта пользователя
 *         schema:
 *           type: string
 *       - name: createdAt
 *         in: query
 *         required: false
 *         description: Дата создания пользователя
 *         schema:
 *           type: date
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди ивента
 *         schema:
 *           type: string
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     500:
 *         description: Ошибка при выполнении запроса
 * /events/?:
 *   put:
 *     summary: Отправить данные для обновления в БД
 *
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         description: название ивента
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         required: false
 *         description: Описание ивента
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         required: false
 *         description: Дата проведения ивента
 *         schema:
 *           type: string
 *       - name: CreatedBy
 *         in: query
 *         required: false
 *         description: Айди пользователя, создавшего ивент
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди ивента
 *         schema:
 *           type: string
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     500:
 *         description: Ошибка при выполнении запроса
 *   delete:
 *     summary: Удалить ивент по айди
 *
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди ивента
 *         schema:
 *           type: string
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     404:
 *         description: Ответ с текстом о ненайденых строках
 *     500:
 *         description: Ошибка при выполнении запроса
 *   post:
 *     summary: Отправить данные для загрузки в БД
 *
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         description: название ивента
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         required: false
 *         description: Описание ивента
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         required: false
 *         description: Дата проведения ивента
 *         schema:
 *           type: string
 *       - name: CreatedBy
 *         in: query
 *         required: false
 *         description: Айди пользователя, создавшего ивент
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди ивента
 *         schema:
 *           type: string
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     500:
 *         description: Ошибка при выполнении запроса
 *   get:
 *     summary: Получить ивент с айди из параметра
 *
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди пользователя
 *         schema:
 *           type: string
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     404:
 *         description: Ответ с текстом о ненайденых строках
 *     500:
 *         description: Ошибка при выполнении запроса
 *   
 * /users:
 *   get:
 *     summary: Получить пользователей всех
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     404:
 *         description: Ответ с текстом о ненайденых строках
 *     500:
 *         description: Ошибка при выполнении запроса
 * /events:
 *   get:
 *     summary: Получить ивенты все
 *     headers:
 *         API_KEY:
 *           type: "string"
 *     responses:
 *     200:
 *         description: Успешный ответ с json ответом
 *     400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *     404:
 *         description: Ответ с текстом о ненайденых строках
 *     500:
 *         description: Ошибка при выполнении запроса


 */