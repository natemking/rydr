/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const API = {
    // GET BAND BY USER ID
    getBandByUserId(id){
        return axios.get(`/api/dbRoutes/user/${id}`)
    },
    // GET USER INFO BY ID
    getBand(id){
        return axios.get(`/api/dbRoutes/band/${id}`)
    },
    // CREATE NEW band
    createBand(bandData){
        return axios.post('/api/dbRoutes/band/', bandData)
    },
    // UPDATE Band INFO
    updateBandData(id, bandData){
        return axios.put(`/api/dbRoutes/band/${id}`, bandData)
    },
    // DELETE Band BY ID
    deleteBand(id){
        return axios.delete(`/api/dbRoutes/band/${id}`)
    },
    // GET VENUE BY ID
    getVenueById(id){
        return axios.get(`api/dbRoutes/venue/${id}`)
    },
    // GET VENUE BY NAME
    getVenueByName(name){
        return axios.get(`/api/dbRoutes/venue/name/${name}`)
    },
    // GET ALL VENUES
    getVenues(){
        return axios.get(`/api/dbRoutes/venue/`)
    },
    // CREATE NEW VENUE FROM FOURSQUARE SEARCH BY ID
    createVenueById(id){
        return axios.post(`/api/dbRoutes/venue/${id}`)
    },
    // CREATE NEW VENUE BY NAME IF NOT FOUND IN FOURSQUARE SEARCH
    createVenueByName(name, venueData){
        return axios.post(`/api/dbRoutes/venue/${name}`, venueData)
    },
    // POST NEW REVIEW TO VENUE
    postVenueReview(reviewData){
        return axios.put(`/api/dbRoutes/venue/${reviewData}`)
    },
    searchFourSquare(queryData){
        return axios.post(`/api/fourSquareRoutes/${queryData}/`)
    },
    // create review by taking user input and band id
    createReview(id, reviewData){
        return axios.post(`/api/dbRoutes/reviews/${id}`, reviewData)
    },
    // for future reference to update a venue review from a band
    updateReview(id){
        return axios.put(`/api/dbRoutes/reviews/${id}`)
    },
    // for future use to delete review
    deleteReview(id){
        return axios.delete(`/api/dbRoutes/reviews/${id}`)
    },
    // gets all reviews from a specific band
    getReviewByBand(bandId){
        return axios.get(`/api/dbRoutes/reviews/band/${bandId}`)
    },
    // gets all reviews on a specific venue
    getReviewByVenue(venueId){
        return axios.get(`/api/dbRoutes/reviews/venue/${venueId}`)
    },
    // recaptcha verification with token
    recaptchaUserVerify(responseToken){
        return axios.post(`/api/userverify/${responseToken}`)
            .then(response => {
                return response ? console.log('You are human!') : console.log('No Robots allowed!');
            }
        )
    }
};

export default API;