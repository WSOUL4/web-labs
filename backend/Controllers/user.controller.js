import {conn} from '../Configs/start.database.js'
import {User} from '../Models/User/user.model.js'

//import {getParameterByName} from './SharedFuncs.js'
//●	Получение списка пользователей (GET /users)
function getAll(req, res){

     User.findAll({
         attributes: {exclude: ['password','createdAt','updatedAt']}})//We cant show password
         .then(users => {
             if (users && users.length == 0) {
                 //throw NotFoundError;
                 res.status(404).send(`No users found`);

             } else if (users) {
                 res.status(200).send(users);
             }


         })
         .catch(err=> {res.status(500).send(`Database error`);})


    /*.finally(()=>{
             conn.close() // Always close the connection when done
                 .then()})*/

}
//●	Создание нового пользователя (POST /users)
function add(req, res){
    console.log(req.body);
     try {
          //name, email, createdAt, id

         //let id=req.body.id;
          let p = req.body;


         User.create(p)
              .then(()=>{

                      res.status(200).send(`Added new user`);

              })
              .catch(err=>{ res.status(500).send(`Not added`);})

         /*.finally(()=>{
                  conn.close() // Always close the connection when done
                      .then()})*/
     } catch (error) {
          console.error('Error creating user:', error);
     }
}



export {getAll,add}