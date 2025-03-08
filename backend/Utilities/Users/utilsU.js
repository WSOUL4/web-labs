import {User} from "../../Models/User/user_model.js";

function isUniqueId (val) {
    return User.count({
        where:
            { id: val }
    })
        .then(count => {
            //console.log(count);
            return count === 0;

        })
    /*.finally(()=>{
        conn.close() // Always close the connection when done
           .then()})*/

}

function isUniqueEmail (val) {
    return User.count({
        where:
            { email: val }
    })
        .then(count => {
            //console.log(count);
            return count === 0;

        })
    /*
    .finally(()=>{
        conn.close() // Always close the connection when done
            .then()})*/

}

export  {isUniqueId,isUniqueEmail}