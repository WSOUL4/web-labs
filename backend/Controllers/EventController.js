import {conn} from '../Database/db_start.js'
import {Event} from '../Models/Event/event_model.js'
function GetAllEvents(req, res){
    let q=Event.findAll()
        .then(() => {res.send(q);})
        .catch(err=> {console.log(err);})
}


export {GetAllEvents}