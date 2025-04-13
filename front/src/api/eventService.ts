import axios from 'axios';
import {getHeadersToken} from '../utils/localStorage';
const apiUrl = process.env.REACT_APP_API_URL;
import {EventData} from '../pages/Events/components/eventsContext';
export const findAll = async () => {
    try {
        const response = await axios.get(`${apiUrl}/events`,{ headers: getHeadersToken() });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};

export const findMy = async () => {
    try {
        const response = await axios.get(`${apiUrl}/events/my`,{ headers: getHeadersToken() });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};

export const findBetweenDates = async (sD: string, eD: string) => {
    try {
        console.log(getHeadersToken());
        const response = await axios.post(`${apiUrl}/events/dates`,{ headers: getHeadersToken(),
            'startDate':sD,
            'endDate':eD
        });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};


export const changeEvent = async (event: EventData) => {
    try {
        //console.log(event);
        const headers = getHeadersToken();
        const response = await axios.put(`${apiUrl}/events/id`, { 
            title: event.title,
            description: event.description,
            date: event.date,
            createdBy: event.createdBy,
            id:event.id,
        }, {
            headers: headers
        });

        return response.data; 
    } catch (error) {
        throw error; 
    }
};