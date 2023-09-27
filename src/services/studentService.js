import axios from "axios";

class StudentService {

    static getStudents(page) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${page}`);
    }
    static getStudentSearch(page, search) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${page}${search ? `&q=${encodeURIComponent(search)}` : ''}`);
    }
    static getStudent(id) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students/${id}`);
    }
    static postStudent(data) {
        return axios.post('https://js-post-api.herokuapp.com/api/students', data);
    }
    static putStudent(id, data) {
        return axios.put(`https://js-post-api.herokuapp.com/api/students/${id}`, data);
    }
    static deleteStudent(id) {
        return axios.delete(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
}
export default StudentService;