const clientId = "GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1";
const secretId = "IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4";
const limit = ;
const city = "";

$(document).ready(() => {
    $(document).on('click','.venueBtn', function(event) {
        event.preventDefault();
        $.get(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${secretId}&v=20180323&limit=${limit}&categoryId=4bf58dd8d48988d1e5931735&near=${city}`).then(venueData => {
            const venueData = 
            $.post("/api/")
        })
    })
})

`https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&limit=${limit}&categoryId=4bf58dd8d48988d1e5931735&near=${city}`