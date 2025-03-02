import {conn} from '../Database/db_start.js'
import {User} from './User/user_model.js'
import {Event} from './Event/event_model.js'

Event.belongsTo(User);
User.hasMany(Event);


//const user = await User.findOne();