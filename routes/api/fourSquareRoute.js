const router = require('express').Router();
const apiController = require('../../controllers/apiController');


router.route("/search/:limit/:city")
.get(apiController.)
.post(apiController.searchVenueApi);




// https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&limit=${limit}&categoryId=4bf58dd8d48988d1e5931735&near=${city}

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
