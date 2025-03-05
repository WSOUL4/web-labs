import {conn} from '../Database/db_start.js';
import {Event} from '../Models/Event/event_model.js';
import {getParameterByName} from "./SharedFuncs.js";
import { Op } from 'sequelize';
import {NotFoundError} from "../CustomErrors/errors.js";
//●	Получение списка всех мероприятий (GET /events)
function GetAll(req, res){
    let q=Event.findAll()
        .then(q => {

            if (q && q.length == 0) {
                //throw NotFoundError;
                res.status(404).send(`No events found`);

            } else if (q) {
                res.status(200).send(q);
            }
        })
        .catch(err=> {res.status(500).send(`Database died `,err);})
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})
}

//●	Получение одного мероприятия по ID (GET /events/:id)
function GetById(req, res){
    //let id=getParameterByName('id',req.url);// А тут почему то работает req.params, не знаю почему на 1+ ломается
    const eventId = req.params.id;
    let q=Event.findByPk(eventId)
        .then(q => {

            if (q && q.length == 0) {
                //throw NotFoundError;
                res.status(404).send(`No events found`);

            } else if (q) {
                res.status(200).send(q);}
        })
        .catch(err=> {res.status(500).send(`Database died `,err);})
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})
}
//●	Создание мероприятия (POST /events)
function Create(req, res){
    //title, description, date, createdBy, id
    let title=getParameterByName('title',req.url);
    let description=getParameterByName('description',req.url);
    let date=getParameterByName('date',req.url);
    let createdBy=getParameterByName('createdBy',req.url);

    let id=Number(getParameterByName('id',req.url));
    let p = {"title":title,"description": description,"date":date, "createdBy":createdBy,"id":id};
    let q= Event.create(p)
        .then(q=>{
            res.status(200).send("Created successfully");})
        .catch(err=> {res.status(500).send(`Database died `,err);console.log(err);})
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})
}
//●	Обновление мероприятия (PUT /events/:id)
function ChangeById(req, res){
    //title, description, date, createdBy, id
    let title=getParameterByName('title',req.url);
    let description=getParameterByName('description',req.url);
    let date=getParameterByName('date',req.url);
    let createdBy=getParameterByName('createdBy',req.url);

    let id=Number(getParameterByName('id',req.url));
    let p = {"title":title,"description": description,"date":date, "createdBy":createdBy,"id":id};
    let [rowsUpdated]=Event.update({
        title: p.title,
        description: p.description,
        date: p.date,
        createdBy:p.createdBy }, {
        where: {
            id: p.id,
        }
    })
        .then(rowsUpdated => {
            if (rowsUpdated > 0) {
                res.status(200).send(`Event with ID ${p.id} updated successfully.`);
            } else {
                res.status(200).send(`No event found with ID ${p.id}.`);
            }
        })
        .catch(err=> {res.status(500).send(`Database died `,err);})
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})
}
//●	Удаление мероприятия (DELETE /events/:id)
function DeleteById(req, res){
    let p = req.params.id;
    let [rowsUpdated]=Event.destroy( {
        where: {
            id: p.id,
        }
    })
        .then(rowsUpdated => {
            if (rowsUpdated > 0) {
                res.status(200).send(`Event with ID ${p.id} deleted successfully.`);
            } else {
                res.status(404).send(`No event found with ID ${p.id}.`);
            }
        })
        .catch(err=> {res.status(500).send(`Database died `,err);})
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})
}
//●	Получение мероприятий между date (GET /events/:startDate:endDate)
function GetBetween(req, res){

    let startDate=getParameterByName('startDate',req.url);
    let endDate=getParameterByName('endDate',req.url);

    //let p = {"startDate":startDate,"endDate":endDate};
    /*const where = {
        from: {
            $between: [startDate, endDate]
        }
    };*/
    let q=Event.findAll( {
        where: {
            date: {
        [Op.between]: [startDate, endDate]
    }
        }
    })
        .then(q => {
            console.log(q.length);
            if (q && q.length == 0) {
                //throw NotFoundError;
                res.status(404).send(`No event found between`);

            } else if (q) {
                res.status(200).send(q);
            }
        })
        .catch(err=> {res.status(500).send(`Database died `,err);})
        .finally(()=>{
            conn.close() // Always close the connection when done
                .then()})
}

export {GetAll,GetById,Create,ChangeById,DeleteById,GetBetween}