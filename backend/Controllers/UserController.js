import {conn} from '../Database/db_start.js'
import {User} from '../Models/User/user_model.js'

//import {getParameterByName} from './SharedFuncs.js'
//●	Получение списка пользователей (GET /users)
function GetAll(req, res){

     let q=User.findAll({
         attributes: {exclude: ['password']}})//We cant show password
         .then(q => {
             if (q && q.length == 0) {
                 //throw NotFoundError;
                 res.status(404).send(`No users found`);

             } else if (q) {
                 res.status(200).send(q);
             }


         })
         .catch(err=> {res.status(500).send(`Database died`);})


    /*.finally(()=>{
             conn.close() // Always close the connection when done
                 .then()})*/

}
//●	Создание нового пользователя (POST /users)
function Add(req, res){
    console.log(req.body);
     try {
          //name, email, createdAt, id

         //let id=req.body.id;
          let p = req.body;


         let q= User.create(p)
              .then(q=>{

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



export {GetAll,Add}