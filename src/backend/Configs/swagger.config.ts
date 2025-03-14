/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of events
 *       404:
 *         description: No events found
 *       500:
 *         description: Database error
 */
function getAll(req, res) {
  /* ... */
}

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       404:
 *         description: No events found with the given ID
 *       500:
 *         description: Database error
 */
function getById(req, res) {
  /* ... */
}

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               createdBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Database error
 */
function create(req, res) {
  /* ... */
}

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               createdBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: No event found with ID
 *       500:
 *         description: Database error
 */
function changeById(req, res) {
  /* ... */
}

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event
 *         schema:
 *           type: integer
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user's ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *       404:
 *         description: No users found
 *       500:
 *         description: Database error
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     parameters:
 *       - name: API_KEY
 *         in: header
 *         required: true
 *         description: The API key for authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       200:
 *         description: User successfully added
 *       400:
 *         description: Validation error, check fields
 *       500:
 *         description: Database error
 */
