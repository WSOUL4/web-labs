import { Request, Response, NextFunction } from 'express';
import { isUniqueEmail } from '../Utilities/Users/user.utils.js';

function checkRegField(req: Request, res: Response, next: NextFunction) {
    const email: string = req.body.email;
    const id: string | undefined = req.body.id; // Assuming `id` may or may not be provided

    isUniqueEmail(email)
        .then((isUnique: boolean) => {
            if (isUnique) {
                next(); // Proceed to the next middleware/controller
            } else {
                res.status(400).send({ message: 'Not unique email' }); // Send error response
            }
        })
        .catch((err: Error) => {
            console.error(err); // Improved error logging
            res.status(500).send({ message: 'Internal server error' }); // Handle server errors
        });
}

export { checkRegField };