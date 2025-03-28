import { Event } from '../../Models/Event/event.model.js';
import { conn } from '../../Configs/start.database.js';

function isUniqueId(val) {
  //utils
  return Event.count({
    where: { id: val },
  }).then((count) => {
    //console.log(count);
    return count === 0;
  });
}

export { isUniqueId };
