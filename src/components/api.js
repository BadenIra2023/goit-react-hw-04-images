import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = "36454342-dbf92e03a878d62005382d68a";

export const fetchImgs = async (query,page) => {
    const response = await axios.get
    (`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`)
    return response.data;
}