const router = require('express').Router();
const apiController = require('../../controllers/apiController');


// ROUTES FOR FOURSQUARE DB
router.route("/search/:limit/:city/:radius")
.post(apiController.postVenueApi)
.get(apiController.getVenueApi);

module.exports = router






// // https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&limit=30&categoryId=4bf58dd8d48988d1e5931735&near=philadelphia

// fetch("https://fairestdb.p.rapidapi.com/rydr/friendModel", {
//         "method": "POST",
//         "headers": {
//             "x-rapidapi-host": "fairestdb.p.rapidapi.com",
//             "x-rapidapi-key": "apikey",
//             "content-type": "application/json",
//             "accept": "application/json"
//         },
//         "body": JSON.stringify({
//             name: this.state.name,
//             notes: this.state.notes
//         })
//     })
//     .then(response => response.json())
//     .then(response => {
//         console.log(response)
//     })
//     .catch(err => {
//         console.log(err);
//     });
