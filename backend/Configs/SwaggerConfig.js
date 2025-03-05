import swaggerJsdoc  from 'swagger-jsdoc'
/**
 * @swagger
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
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *
 * /events/?:
 *   get:
 *     summary: Получить ивент с айди из параметра, или по датам если будут присутствовать они
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди ивента
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Дата начала промежутка за который нужно искать ивенты, вид ГГГГ-ММ-ДД
 *         schema:
 *           type: string
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: Дата конца промежутка за который нужно искать ивенты, вид ГГГГ-ММ-ДД
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       500:
 *         description: Ошибка при выполнении запроса
 *   post:
 *     summary: Занести в базу нового пользователя с обязательным полем в виде email
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         description: ФИО пользователя
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         required: true
 *         description: Эл. почта пользователя
 *         schema:
 *           type: string
 *       - name: createdAt
 *         in: query
 *         required: false
 *         description: Дата создания пользователя пользователя(ГГГГ-ММ-ДД)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 * /events:
 *   get:
 *     summary: Получить список всех ивентов
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       500:
 *         description: Ошибка при выполнении запроса
 *   post:
 *     summary: Занести в базу новый ивент с обязательными полями в виде создателя ивента
 *     parameters:
 *       - name: title
 *         in: query
 *         required: true
 *         description: Название ивента
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
 *         description: Дата проведения ивента (ГГГГ-ММ-ДД)
 *         schema:
 *           type: string
 *       - name: createdBy
 *         in: query
 *         required: true
 *         description: Айди создателя ивента
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *   put:
 *     summary: Изменить запись ивента по айди, нужны все атрибуты, даже если не меняете их
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Айди ивента, что меняем
 *         schema:
 *           type: string
 *       - name: title
 *         in: query
 *         required: true
 *         description: Название ивента
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         required: true
 *         description: Описание ивента
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         required: true
 *         description: Дата проведения ивента (ГГГГ-ММ-ДД)
 *         schema:
 *           type: string
 *       - name: createdBy
 *         in: query
 *         required: true
 *         description: Айди создателя ивента
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *   delete:
 *     summary: Удалить запись по передаваемому айди
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Айди ивента, что удаляем
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *
 */