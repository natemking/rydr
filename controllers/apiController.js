const axios = require('axios');
const clientId= 'GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1';
const clientSecret= 'IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4';
const category = "4bf58dd8d48988d1e5931735";
const limit = '';
const city = '';
const radius = '';
const query = `${url}?client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}&v=20180323&limit=${limit}&categoryId=${category}&near=${city}&radius=${radius}`;
const url = `https://api.foursquare.com/v2/venues/search${query}`;

module.exports = {
    async searchVenueApi(req,res) {
        try {
            const response = await axios.get(url);
            res.send(response.venues);
            
        } catch(err) {console.error(err)} 
    }
}
