import { Request, Response } from 'express';
import { User, UserAttributes } from '../Models/User/user.model';
import { valErr, emptyErr } from '../CustomErrors/errors';
interface UserAttributesC {
  id: number; // Поле id
  name?: string;
  surname?: string;
  fname?: string;
  gender?: string;
  birthday?: string;
}
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
      surname: req.body.surname,
      fname: req.body.fname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      email: req.body.email,
      password: req.body.password,
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


export async function changeById(req: Request, res: Response): Promise<void> {
  const userData: UserAttributesC = {
      id:req.body.id,
      name: req.body.name,
      surname: req.body.surname,
      fname: req.body.fname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      
  };

  try {
    const [rowsUpdated] = await User.update(
      {
        name:req.body.name,
        surname:req.body.surname,
        fname:req.body.fname,
        gender:req.body.gender,
        birthday:req.body.birthday,
      },
      {
        where: {
          id: userData.id,
        },
      },
    );

    if (rowsUpdated > 0) {
      res
        .status(200)
        .send(`User with ID ${userData.id} updated successfully.`);
    } else {
      //emptyErr(res);
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}






export { getAll, add };
