import {conn} from '../Database/db_start.js'
import {User} from '../Models/User/user_model.js'

import {getParameterByName} from './SharedFuncs.js'
//●	Получение списка пользователей (GET /users)
function GetAll(req, res){

     let q=User.findAll({raw:true})
         .then(q => {
             if (q && q.length == 0) {
                 //throw NotFoundError;
                 res.status(404).send(`No users found`);

             } else if (q) {
                 res.status(200).send(q);
             }


         })
         .catch(err=> {res.status(500).send(`Database died`,err);})

         .finally(()=>{
              conn.close() // Always close the connection when done
             .then()})

}
//●	Создание нового пользователя (POST /users)
function Add(req, res){
     try {
          //name, email, createdAt, id
         let name=getParameterByName('name',req.url);
         let email=getParameterByName('email',req.url);
         let createdAt=getParameterByName('createdAt',req.url);
         let id=Number(getParameterByName('id',req.url));
          let p = {"name":name,"email": email,"createdAt":createdAt,"id":id};
            console.log(p);

         let q= User.create(p)
              .then(q=>{

                      res.status(200).send(`Added new user`);

              })
              .catch(err=>{ res.status(500).send(`Not added`,err);})
              .finally(()=>{
                   conn.close() // Always close the connection when done
                       .then()})
     } catch (error) {
          console.error('Error creating user:', error);
     }
}



export {GetAll,Add}