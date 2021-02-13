import axios from 'axios';

export default {
    // GET USER INFO BY ID
    getUser(id){
        return axios.get(`/api/artist/${id}`)
    },
    // CREATE NEW ARTIST
    createUser(userData){
        return axios.post(`/api/artist${userData}`)
    },
    // UPDATE USER INFO
    updateUserData(userData){
        return axios.put(`/api/artist${userData}`)
    },
    // DELETE USER BY ID
    deleteUser(id){
        return axios.delete(`/api/artist/${id}`)
    },
    // GET VENUE BY ID
    getVenueById(id){
        return axios.get(`api/venue/${id}`)
    },
    // GET VENUE BY NAME
    getVenueByName(name){
        return axios.get(`/api/venue/${name}`)
    },
    // CREATE NEW VENUE FROM FOURSQUARE SEARCH BY ID
    createVenueById(id){
        return axios.post(`/api/venue/${id}`)
    },
    // CREATE NEW VENUE BY NAME IF NOT FOUND IN FOURSQUARE SEARCH
    createVenueByName(name){
        return axios.post(`/api/venue/${name}`)
    },
    // POST NEW REVIEW TO VENUE
    postVenueReview(reviewData){
        return axios.put(`/api/venue/${reviewData}`)
    },

};