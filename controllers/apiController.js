require('dotenv').config();

const category = "4bf58dd8d48988d1e5931735"
const url = `https://api.fursquare.com/v2/venues/search?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit={limit}&categoryId=${category}&near={city}`




