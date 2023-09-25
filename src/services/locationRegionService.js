import axios from "axios";

class LocationRegionService {
    static getAllProvince() {
        return axios.get('https://vapi.vnappmob.com/api/province/')
    }
    static getAllDistrict(provinceId) {
        return axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
    }
}

export default LocationRegionService;