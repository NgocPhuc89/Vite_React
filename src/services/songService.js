import axios from "axios";

class SongService {
    static getAllSong() {
        return axios.get('http://localhost:3001/songs');
    }
}

export default SongService;