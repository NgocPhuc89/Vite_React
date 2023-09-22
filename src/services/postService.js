import axios from "axios";

class PostService {
    static getPost() {
        return axios.get('https://js-post-api.herokuapp.com/api/posts')
    }
    static getAll(page) {
        return axios.get(`https://js-post-api.herokuapp.com/api/posts?_page=${page}&_limit=9`)
    }
}

export default PostService;