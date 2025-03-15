import { Request, Response } from 'express';
import { User,UserAttributes } from '../Models/User/user.model';
import { valErr, emptyErr } from '../CustomErrors/errors';


// ● Получение списка пользователей (GET /users)
function getAll(req: Request, res: Response): void {
  User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  }) // We can't show password
    .then((users) => {
      if (users && users.length === 0) {
        emptyErr(res);
      } else if (users) {
        res.status(200).send(users);
      }
    })
    .catch((err) => {
      console.error('Database error:', err);
      res.status(500).send(`Database error`);
    });
}

// ● Создание нового пользователя (POST /users)
function add(req: Request, res: Response): void {
  //console.log(req.body);
  try {
    // let id=req.body.id; // Assuming id is automatically generated
    //let p = req.body;
    const user: UserAttributes = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    //console.log(user);
    User.create(user)
      .then(() => {
        res.status(200).send(`Added new user`);
      })
      .catch((err) => {
        console.error('Error creating user:', err);
        valErr(res);
      });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send(`Internal server error`);
  }
}

export { getAll, add };
