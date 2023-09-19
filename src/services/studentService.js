import axios from "axios";

class StudentService {
    static getStudent(page) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${page}`);
    }
    static postStudent(data) {
        return axios.post('https://js-post-api.herokuapp.com/api/students', data);
    }
    static deleteStudent(id) {
        return axios.delete(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
}
export default StudentService;