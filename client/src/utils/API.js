/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
    // get a user info by id
    getUser(id){
        return axios.get(`/api/artist/${id}`)
    },
    // create new artist
    createUser(userData){
        return axios.post('/api/artist', userData)
    },
    // update user info
    updateUserData(userData){
        return axios.put("/api/artist", userData)
    },
    // delete user by id
    deleteUser(id){
        return axios.delete(`/api/artist/${id}`)
    },
    // get venue by id
    getVenueById(id){
        return axios.get(`api/venue/${id}`)
    },
    // get venue by name
    getVenueByName(name){
        return axios.get(`/api/venue/${name}`)
    },
    // create new venue
    createVenueById(id){
        return axios.post(`/api/venue/${id}`)
    },
    createVenueByName(name){
        return axios.post(`/api/venue/${name}`)
    },
    // post new review to venue
    postVenueReview(reviewData){
        return axios.put('/api/venue/', reviewData)
    },

};