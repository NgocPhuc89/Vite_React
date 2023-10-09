import axios from "axios";

class SingerService {
    static getAllSinger() {
        return axios.get("http://localhost:3001/singers");
    }
}
export default SingerService;