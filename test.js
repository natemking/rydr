const mongoose = require("mongoose");
const db = require("./models");
const util = require('util')





// db.User.create({ userName: 'josh@quotsa.com', password: 'fuck of3' }, function (err, small) {
//     if (err) { console.log(err);};
//     console.log(small);
// });

// const test = async () => {
    
//     try {
//         const data = await db.Venue.findByIdAndUpdate('60280617146fb097d940d13d', 
//         {$push: { reviews: {
//            author: me,
//            rating: 4,
//            reviewText: 'was good' 
//         }}}, { new: true });
//         console.log(data);
//     } catch (err) {
//         console.error(err);
//     }
// }

// test();

// const jbs = {
//     venueName: 'Johnny Brenda\'s',
//     venueAddress: [
//         "1201 Frankford Ave (at Girard Ave)",
//         "Philadelphia, PA 19125",
//         "United States"
//     ],
//     reviews: [
//         {
//             author: null,
//             rating: 2,
//             reviewText: 'Green room was way too small. They offered a veggie platter and not a single thing from the grill downstairs.'
//         },
//         {
//             author: null,
//             rating: 4,
//             reviewText: 'Great Place to play! Awesome vibes.'
//         },
//         {
//             author: null,
//             rating: 4,
//             reviewText: 'Oh man is this place great! What a gem. The staff is great and philly really knows how to let loose'
//         },
//     ]
// }

// const venue = new db.Venue(jbs)
// const doc = venue.save()
// console.log(doc);

// const test = async () => {

//     try {
//         const data = await db.Venue.findOneAndUpdate({'_id': '60280b829463f29aa2be17ac', 'venueReviews._id': '60280b829463f29aa2be17ad'},
//             { $set: {
//                     'venueReviews.$.author': null,
//                     'venueReviews.$.rating': 1,
//                     'venueReviews.$.reviewText': 'sucked'
//                     }
//                 }, { new: true });
//         console.log(data);
//     } catch (err) {
//         console.error(err);
//     }
// }

const test = async () => {
  try {
      const data = await db.Venue.find({}).populate('venueReviews');
    console.log(data[1]); 
      process.exit(0);
  } catch (err) {
      console.error(err);
      process.exit(1)
  }
}

test();

// const responseMap = await YourSchema.find()
//     .populate(
//         path: 'map_data._id',
//         model: 'location'
//         select: ['nameLocation', 'geoPoints', 'count'],
//     ).exec();
// console.log(responseMap);