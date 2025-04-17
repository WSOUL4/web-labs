import axios from 'axios';
import {getHeadersToken} from '../utils/localStorage';
import {ProfileData} from '../components/store/profile/slices';
const apiUrl = process.env.REACT_APP_API_URL;
export const getProfile = async () => {//Если не посылаем ничего кроме заголовка и поставим пост, ахиос убьёт нас
    try {
        //console.log("перед запросом");
        //console.log(getHeadersToken());
        const response = await axios.get(`${apiUrl}/auth/profile`,{ headers: getHeadersToken(),

        });
        //
        //console.log(response);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};

export const changeData= async(user: Partial<ProfileData>)=>{
    try {
        //console.log("перед запросом");
        //console.log(getHeadersToken());
        const response = await axios.put(`${apiUrl}/users/`,user, {
            headers: getHeadersToken(),
        });
        //
        //console.log(response);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        throw error; // Если ошибка, пробрасываем её дальше
    }
};