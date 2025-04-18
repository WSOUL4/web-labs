import axios from 'axios';
import {getHeadersToken} from '../utils/localStorage';
const apiUrl = process.env.REACT_APP_API_URL;
import {EventData} from '../pages/Events/components/eventsContext';
export const findAll = async () => {
    try {
        const response = await axios.get(`${apiUrl}/events`,{ headers: getHeadersToken() });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        throw error; 
    }
};

export const findMy = async () => {
    try {
        const response = await axios.get(`${apiUrl}/events/my`,{ headers: getHeadersToken() });
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const findBetweenDates = async (sD: string, eD: string) => {
    try {
        console.log(getHeadersToken());
        const response = await axios.post(`${apiUrl}/events/dates`,{ headers: getHeadersToken(),
            'startDate':sD,
            'endDate':eD
        });
        return response.data; 
    } catch (error) {
        throw error; 
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
            location:event.location,
            id:event.id,
        }, {
            headers: headers
        });

        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const addEvent = async (event: EventData) => {
    try {
        //console.log(event);
        
        const headers = getHeadersToken();
        const response = await axios.post(`${apiUrl}/events/`, { 
            title: event.title,
            description: event.description,
            date: event.date,
            createdBy: event.createdBy,
            location:event.location,
        }, {
            headers: headers
        });

        return response.data; 
    } catch (error) {
        throw error; 
    }
};

export const deleteEvent = async (eventId:number) => {
    try {
        //console.log(event);
        
        const headers = getHeadersToken();
        const response = await axios.post(`${apiUrl}/events/id`, { 
            id:eventId,
        }, {
            headers: headers
        });

        return response.data; 
    } catch (error) {
        throw error; 
    }
};