import { Event } from '../Models/Event/event.model.js';
import { Op } from 'sequelize';
import { decodeToken, getTokenFromHeaders } from './JWT.controller.js';
import { emptyErr, valErr } from '../CustomErrors/errors.js';

//●	Получение списка всех мероприятий (GET /events)
function getAll(req, res) {
  Event.findAll()
    .then((events) => {
      if (events && events.length === 0) {
        emptyErr(res);
        //res.status(404).send(`No events found`);
      } else if (events) {
        res.status(200).send(events);
      }
    })
    .catch((err) => {
      //res.status(500).send(`Database error`);
      valErr(res);
      console.log(err);
    });

  /*.finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/
}

//●	Получение одного мероприятия по ID (GET /events/:id)
function getById(req, res) {
  const eventId = req.body.id;

  Event.findAll({
    where: { id: eventId },
  })
    .then((events) => {
      if (events && events.length == 0) {
        emptyErr(res);
        //res.status(404).send(`No events found`);
      } else if (events) {
        res.status(200).send(events);
      }
    })
    .catch((err) => {
      //res.status(500).send(`Database error`);
      valErr(res);
      console.log(err);
    });

  /*.finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/
}
function getByMy(req, res) {
  //const eventId = req.body.id;
  let t = getTokenFromHeaders(req);
  let dt = decodeToken(t);
  console.log(dt.id);
  Event.findAll({
    where: { createdBy: dt.id },
  })
    .then((events) => {
      if (events && events.length == 0) {
        emptyErr(res);
        //res.status(404).send(`No events found`);
      } else if (events) {
        res.status(200).send(events);
      }
    })
    .catch((err) => {
      //res.status(500).send(`Database error`);
      valErr(res);
      console.log(err);
    });

  /*.finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/
}
//●	Создание мероприятия (POST /events)
function create(req, res) {
  let p = req.body;
  //console.log(p);
  Event.create(p)
    .then(() => {
      res.status(200).send('Created successfully');
    })
    .catch((err) => {
      //res.status(400).send({mess: `Not added, check fields`});
      valErr(res);
      console.log(err);
    });

  /*.finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/
}
//●	Обновление мероприятия (PUT /events/:id)
function changeById(req, res) {
  let p = req.body;
  Event.update(
    {
      title: p.title,
      description: p.description,
      date: p.date,
      createdBy: p.createdBy,
    },
    {
      where: {
        id: p.id,
      },
    },
  )
    .then((rowsUpdated) => {
      if (rowsUpdated.length > 0) {
        res.status(200).send(`Event with ID ${p.id} updated successfully.`);
      } else {
        emptyErr(res);
        //res.status(200).send(`No event found with ID ${p.id}.`);
      }
    })
    .catch((err) => {
      //res.status(400).send({mess: `Not changed, check fields`});
      valErr(res);
      console.log(err);
    });

  /*.finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/
}
//●	Удаление мероприятия (DELETE /events/:id)
function deleteById(req, res) {
  let p = req.body.id;
  //let p = req.params;
  //console.log(p);
  Event.destroy({
    where: {
      id: p,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        res.status(200).send(`Event with ID ${p} deleted successfully.`);
      } else {
        emptyErr(res);
        //res.status(404).send(`No event found with ID ${p}.`);
      }
    })
    .catch((err) => {
      //res.status(400).send(`Not deleted, check id`);
      valErr(res);
      console.log(err);
    });
}
//●	Получение мероприятий между date (GET /events/:startDate:endDate)
function getBetween(req, res) {
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  Event.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  })
    .then((events) => {
      console.log(events.length);
      if (events && events.length == 0) {
        //throw NotFoundError;
        res.status(404).send(`No event found between`);
      } else if (events) {
        res.status(200).send(events);
      }
    })
    .catch((err) => {
      //res.status(500).send(`Database error`);
      valErr(res);
      console.log(err);
    });

  /*.finally(()=>{
            conn.close() // Always close the connection when done
                .then()})*/
}

export { getAll, getById, create, changeById, deleteById, getBetween, getByMy };
