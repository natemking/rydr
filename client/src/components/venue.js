import React from 'react';
import Rating from 'react-rating'
const Venue = ({venue, isLoading}) => {
   
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <div className="d-flex flex-row flex-wrap align-items-start">
        <img alt="venueMap" className="img-fluid" src="https://via.placeholder.com/420"></img>
        <div className="d-flex flex-column p-2 flex-wrap">
            <h1>{venue[0].venueName}</h1>
            <div className="d-flex flex-row align-items-center">
            <Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x"  fullSymbol="fa fa-star fa-2x" />
            <h5 className="m-2">{venue[0].venueReviews.length}</h5>
            </div>
            <h2>{venue[0].venueAddress[1]}</h2>
            <h3>Address:</h3>
            <div className="d-flex flex-column">
            <p>{venue[0].venueAddress[0]}</p>
            <p>{venue[0].venueAddress[1]}</p>
            <p>{venue[0].venueAddress[2]}</p>
            </div>
            <a href="#">Venue Website</a>
        </div>
        </div>
    //     <div className="d-flex flex-column flex-wrap justify-content-center">
    //     <h1 className="text-center"><u>Venue Reviews</u></h1>
    //    <table className="table table-dark table-striped table-bordered">
    //     <thead>
    //         <tr>
    //         <th className="text-center">Date</th>
    //         <th className="text-center">Band Name</th>
    //         <th className="text-center">Rating</th>
    //         <th className="text-center">Review</th>
    //         </tr>
    //     </thead>
    //   <tbody>
    //     <tr>
    //       <td>02/11/20</td>
    //       <td>The Beatles</td>
    //       <td><Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td>
    //       <td>THIS VENUE WAS TRASH</td>
    //     </tr>
    //   </tbody>
    // </table>
    //     </div>
    //     <hr></hr>
    //     </div>
    )

}

export default Venue;