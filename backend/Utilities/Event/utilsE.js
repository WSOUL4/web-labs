import {Event} from "../../Models/Event/event_model.js";
import {conn} from "../../Database/db_start.js";

function isUniqueId (val) { //utils
    return Event.count({
        where:
            { id: val }
    })
        .then(count => {
            //console.log(count);
            return count === 0;

        })
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})

}


export {isUniqueId}