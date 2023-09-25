import axios from "axios";

class LocationRegionService {
    static getAllProvince() {
        return axios.get('https://vapi.vnappmob.com/api/province/')
    }
}

export default LocationRegionService;