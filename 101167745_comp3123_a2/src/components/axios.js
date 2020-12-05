import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=e6f615d5453bb1fa5bfe0869021e0482'
});

export default instance;