import axios from 'axios';

const API = {
    // GET USER INFO BY ID
    getUser(id){
        return axios.get(`/api/dbRoutes/band/${id}`)
    },
    // CREATE NEW band
    createUser(userData){
        return axios.post(`/api/dbroutes/band${userData}`)
    },
    // UPDATE USER INFO
    updateUserData(userData){
        return axios.put(`/api/dbroutes/band${userData}`)
    },
    // DELETE USER BY ID
    deleteUser(id){
        return axios.delete(`/api/dbroutes/band/${id}`)
    },
    // GET VENUE BY ID
    getVenueById(id){
        return axios.get(`api/venue/${id}`)
    },
    // GET VENUE BY NAME
    getVenueByName(name){
        return axios.get(`/api/dbroutes/venue/${name}`)
    },
    // CREATE NEW VENUE FROM FOURSQUARE SEARCH BY ID
    createVenueById(id){
        return axios.post(`/api/dbroutes/venue/${id}`)
    },
    // CREATE NEW VENUE BY NAME IF NOT FOUND IN FOURSQUARE SEARCH
    createVenueByName(name){
        return axios.post(`/api/dbroutes/venue/${name}`)
    },
    // POST NEW REVIEW TO VENUE
    postVenueReview(reviewData){
        return axios.put(`/api/dbroutes/venue/${reviewData}`)
    },

};

export default API;