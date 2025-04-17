import { saveTokens,getHeadersRefreshToken } from '../utils/localStorage';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
            login: email,
            password: password,
        });
        const { token, refreshToken } = response.data;
        saveTokens(token, refreshToken);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};

export const registerUser = async (email: string, name: string, surname: string, fname: string, gender: string, birthday: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/register`, {
        email,
        name,
        surname,
        fname,
        gender,
        birthday,
        password,
    });
    
    return response.data; // Возвращаем данные ответа
};

export const refresh = async () => {
    try {
        console.log('REFRESHING ACCESS TOKEN');
        const response = await axios.post(`${apiUrl}/auth/refresh`, {
            headers: getHeadersRefreshToken()
        });
        const { token } = response.data;
        saveTokens(token,undefined);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};