import { Request, Response } from 'express';
import { Event,EventAttributes } from '@models/Event/event.model';
import { Op } from 'sequelize';
import { decodeToken, getTokenFromHeaders } from './JWT.controller.js';
import { emptyErr, valErr } from '@errors/errors';

// ● Получение списка всех мероприятий (GET /events)
async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const events = await Event.findAll();
    if (events.length === 0) {
      emptyErr(res);
    } else {
      res.status(200).send(events);
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}

// ● Получение одного мероприятия по ID (GET /events/:id)
async function getById(req: Request, res: Response): Promise<void> {
  const eventId:number = req.body.id; // Changed to use params for ID

  try {
    const events = await Event.findAll({
      where: { id: eventId },
    });
    if (events.length === 0) {
      emptyErr(res);
    } else {

      res.status(200).send(events);
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}

// ● Получение мероприятий, созданных текущим пользователем
async function getByMy(req: Request, res: Response): Promise<void> {
  const token = getTokenFromHeaders(req);

  try {
    if (token != null) {
      const decoded = decodeToken(token);
      const events = await Event.findAll({
        where: { createdBy: decoded.id },
      });
      if (events.length === 0) {
        emptyErr(res);
      } else {
        res.status(200).send(events);
      }
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}

// ● Создание мероприятия (POST /events)
function add(req: Request, res: Response) {
  //const eventData = req.body;
  const eventData:EventAttributes = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    createdBy: req.body.createdBy,
  };
  console.log(eventData);

     Event.create(eventData).then(() => {
       res.status(200).send(`Added new event`);
     })
         .catch((err) => {
           console.error('Error adding an event:', err);
           valErr(res);
         });
  }


// ● Обновление мероприятия (PUT /events/:id)
async function changeById(req: Request, res: Response): Promise<void> {
  const eventData:EventAttributes = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    createdBy: req.body.createdBy,
  };

  try {
    const [rowsUpdated] = await Event.update(
      {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        createdBy: eventData.createdBy,
      },
      {
        where: {
          id: eventData.id,
        },
      },
    );

    if (rowsUpdated > 0) {
      res
        .status(200)
        .send(`Event with ID ${eventData.id} updated successfully.`);
    } else {
      emptyErr(res);
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}

// ● Удаление мероприятия (DELETE /events/:id)
async function deleteById(req: Request, res: Response): Promise<void> {
  const eventId = req.body.id; // Changed to use params for ID

  try {
    const rowsDeleted = await Event.destroy({
      where: {
        id: eventId,
      },
    });

    if (rowsDeleted > 0) {
      res.status(200).send(`Event with ID ${eventId} deleted successfully.`);
    } else {
      emptyErr(res);
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}

// ● Получение мероприятий между date (GET /events/:startDate:endDate)
async function getBetween(req: Request, res: Response): Promise<void> {
  const startDate:string = req.body.startDate;
  const endDate:string = req.body.endDate;

  try {
    const events = await Event.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    //console.log(events);
    if (events.length === 0) {
      res.status(404).send(`No event found between`);
    } else {
      res.status(200).send(events);
    }
  } catch (err) {
    valErr(res);
    console.log(err);
  }
}

export { getAll, getById, add, changeById, deleteById, getBetween, getByMy };
