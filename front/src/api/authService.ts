import { saveTokens } from '../utils/localStorage';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
            login: email,
            password: password,
        });
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};

export const registerUser = async (email: string, name: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/register`, {
        email,
        name,
        password,
    });
    return response.data; // Возвращаем данные ответа
};