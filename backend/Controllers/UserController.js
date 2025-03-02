import {conn} from '../Database/db_start.js'
import {User} from '../Models/User/user_model.js'
function GetAllUsers(req, res){
     let q=User.findAll()
         .then(() => {res.send(q);})
         .catch(err=> {console.log(err);})
}


export {GetAllUsers}