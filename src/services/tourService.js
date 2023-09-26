import axios from "axios";



class TourService {
    static getAllTour() {
        return axios.get('https://6507f43556db83a34d9b7f0c.mockapi.io/api/tour/tour')
    }
    static getById(tourId) {
        return axios.get(`https://6507f43556db83a34d9b7f0c.mockapi.io/api/tour/tour/${tourId}`)
    }
    static createTour(data) {
        return axios.post('https://6507f43556db83a34d9b7f0c.mockapi.io/api/tour/tour', data)
    }
    static editTour(id, data) {
        return axios.put(`https://6507f43556db83a34d9b7f0c.mockapi.io/api/tour/tour/${id}`, data)
    }
    static delete(id) {
        return axios.delete(`https://6507f43556db83a34d9b7f0c.mockapi.io/api/tour/tour/${id}`)
    }
}

export default TourService;