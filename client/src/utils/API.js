import axios from 'axios';

export default {
    // get a user info by id
    getUser(id){
        return axios.get(`/api/artist/${id}`)
    },
    // get venue by id
    getVenue(id){
        return axios.get(`api/venue/${id}`)
    },
    reviewVenue(review){
        return axios.post('/api/venue/', review)
    },
    
};