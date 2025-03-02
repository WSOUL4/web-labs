import {conn} from '../Database/db_start.js'
import {User} from './User/user_model.js'
import {Event} from './Event/event_model.js'


User.hasMany(Event, {
    foreignKey: 'createdBy',
});
Event.belongsTo(User);

//const user = await User.findOne();