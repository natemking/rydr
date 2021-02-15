const axios = require('axios');
// const clientId= 'GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1';
// const clientSecret= 'IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4';
// const category = "4bf58dd8d48988d1e5931735";
// const query = `&limit=100&near=${city}&radius=${radius}`;
const url = `https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&categoryId=4bf58dd8d48988d1e5931735`;
// 


module.exports = {
    async getVenueApi(req, res) {
        const { city } = req.params;
        const { radius } = req.params;
        try {
            const result = await axios.get(`${url}&limit=100&near=${city}&radius=${radius}`);
            console.log(result.data.response.venues)
            res.send(result.data.response.venues)

        } catch (err) { res.status(422).json(err) }
    },
    // API call for reCAPTCHA to verify the user 
    async recaptchaUserVerify(req,res) {
        try {
            const { userToken } = req.params
            
            const verify = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${userToken}`)

            console.log('reCAPTCHA user verify status:');
            console.log(verify.data);
            res.json(verify.data)
        } catch (err) { res.status(422).json(err) }
    }
}
