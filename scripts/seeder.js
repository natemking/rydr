const mongoose = require("mongoose");
const db = require("../models");


//*** Seed data ***//
//=================//
const userSeed = [
    {
        userName: 'josh@qotsa.com',
        password: 'secret',
        bandId: null
    },
    {
        userName: 'gustav@dungen.com',
        password: 'alasstak',
        bandId: null
    },
    {
        userName: 'remi@slift.com',
        password: 'hyperion',
        bandId: null
    },
]

const bandSeed = [
   { 
        bandName: 'Queens of the StoneAge',
        bandImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Queens_of_the_Stone_Age_-_SSE_Arena_Wembley_-_Saturday_18th_November_2017_QOTSAWembley181117-29_%2824730972488%29.jpg/1600px-Queens_of_the_Stone_Age_-_SSE_Arena_Wembley_-_Saturday_18th_November_2017_QOTSAWembley181117-29_%2824730972488%29.jpg',
        bandBio: 'Queens of the Stone Age (commonly abbreviated QOTSA) is an American rock band formed in 1996 in Palm Desert, California. The band was founded by vocalist and guitarist Josh Homme, who has been the only constant member throughout multiple line-up changes. The current line-up consists of Homme alongside Troy Van Leeuwen (guitar, lap steel, keyboard, percussion, backing vocals), Michael Shuman (bass guitar, keyboard, backing vocals), Dean Fertita (keyboards, guitar, percussion, backing vocals), and Jon Theodore (drums, percussion). The band also have a large pool of contributors and collaborators.[1] Queens of the Stone Age are known for their blues, Krautrock and electronica-influenced style of riff-oriented and rhythmic hard rock music, coupled with Homme\'s distinct falsetto vocals and unorthodox guitar scales.',
        bandLinks: [
            {
                siteName: 'Web Site',
                siteUrl: 'https://qotsa.com/'
            },
            {
                siteName: 'YouTube',
                siteUrl: 'https://www.youtube.com/watch?v=3bwOzNv_Gtc&ab_channel=QueensOfTheStoneAge'
            },
            {
                siteName: 'Facebook',
                siteUrl: 'https://www.facebook.com/QOTSA/'
            },
        ],
        location: 'Palm Desert, CA',
        contact: 'josh@qotsa.com',
        },
    {
        bandName: 'Dungen',
        bandImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/DungenAtMalm%C3%B6festivalen2006.jpg/520px-DungenAtMalm%C3%B6festivalen2006.jpg',
        bandBio: 'Dungen is a Swedish rock band based in Stockholm. Often classified as psychedelic rock, Dungen is also influenced by Swedish (and other) folk music, classic rock, progressive rock, garage rock and alternative rock.The band is fronted by singer/ composer Gustav Ejstes, who writes all music and plays the majority of instruments on the band\'s records. Despite this, Dungen plays live as a four-piece. Ejstes, who in his teens started his songwriting with hip hop, is backed live by Swedish progressive rock veteran Reine Fiske (Landberk, Morte Macabre, Paatos, The Amazing) on guitar, bassist Mattias Gustavsson (Life On Earth!), and drummer Johan Holmegard (previously on drums was Fredrik Björling), all of whom have played parts on Dungen\'s studio albums.',
        bandLinks: [
            {
                siteName: 'Web Site',
                siteUrl: 'http://www.dungen-music.com/'
            },
            {
                siteName: 'Bandcamp',
                siteUrl: 'https://dungen.bandcamp.com/'
            },
            {
                siteName: 'Facebook',
                siteUrl: 'https://www.facebook.com/dungenmusic'
            },
        ],
        location: 'Stockholm, Sw',
        contact: 'gustav@dungen.com',
    },
    {
        bandName: 'Slift',
        bandImg: 'https://www.globalgarageshow.com/wp-content/uploads/2018/11/Slift-800x445.jpg',
        bandBio: 'Slift are a French trio who combine the ethos and aesthetic trappings of garage rock with cosmic atmosphere and mantra-like repetition. I was introduced to them via their 2018 album, La Planète Inexplorée. That album was great, and Ummon took everything I loved about it and cranked it up even harder.Ummon is not a record for the faint of heart.It’s 72 minutes of garage- kraut - doom(or maybe doom - garage - kraut) with barely any breathing room.Huge, abrasive walls of guitar dominate this record, while chaotic bursts of noise pummel the listener.The band members themselves give fair warning on how key repetition is to this album’s sound on their Bandcamp page(or, as they phrase it, “r r e e p p e e t t i i t t i i o o n n”).With all this in mind, if you’re willing to give it a shot, this album is highly rewarding.',
        bandLinks: [
            {
                siteName: 'Web Site',
                siteUrl: 'http://sliftrock.com/'
            },
            {
                siteName: 'Bandcamp',
                siteUrl: 'https://slift.bandcamp.com/'
            },
            {
                siteName: 'Facebook',
                siteUrl: 'https://www.facebook.com/sliftrock'
            },
        ],
        location: 'Toulouse, Fr',
        contact: 'remi@slift.com',
    },
]

const venueSeed = [
    {
        venueName: 'Johnny Brenda\'s',
        venueAddress: [
            "1201 Frankford Ave (at Girard Ave)",
            "Philadelphia, PA 19125",
            "United States"
        ],
    },
    {
        venueName: 'Union Transfer',
        venueAddress: [
            '1026 Spring Garden St', 
            'Philadelphia, PA 19123',
            'United States'

        ],
    }
]

const reviewSeed = [
    {   
        venue: '',
        author: null,
        rating: 2,
        reviewText: 'Green room was way too small. They offered a veggie platter and not a single thing from the grill downstairs.'
    },
    {
        venue: '',
        author: null,
        rating: 4,
        reviewText: 'Great Place to play! Awesome vibes.'
    },
    {
        venue: '',
        author: null,
        rating: 4,
        reviewText: 'Oh man is this place great! What a gem. The staff is great and philly really knows how to let loose'
    },
    {
        venue: '',
        author: null,
        rating: 5,
        reviewText: 'Great sound and the crowd was really into it. Awesome building. Heard it was a Spaghetti Factory at on time.'
    },
    {
        venue: '',
        author: null,
        rating: 5,
        reviewText: 'Insane sound. Really great staff too. They know how to treat the artists.'
    },
    {
        venue: '',
        author: null,
        rating: 5,
        reviewText: 'Really great fun. I couldn\'t believe how good our guitars sounded in that room. The mix was on point. Talk about professional. They really know what they\'re doing. A+'
    },
]

//*** Seed functions ***//
//======================//

// Seed the User collection with the userSeed data
const seedUser = async () => {
    try {
        await db.User.deleteMany({});
        const data = await db.User.insertMany(userSeed);
        console.log('\nInitial seed \n' + '-'.repeat(50));
        console.log(`${data.length} Users inserted`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Seed the Band collection with the bandSeed data
const seedBand = async () => {
    try {
        await db.Band.deleteMany({});
        const data = await db.Band.insertMany(bandSeed);
        console.log(`${data.length} Bands inserted`);
        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Seed the venue collection with the venueSeed data
const seedVenue = async () => {
    try {
        await db.Venue.deleteMany({});
        const data = await db.Venue.insertMany(venueSeed);
        console.log(`${data.length} Venues inserted`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Seed the review collection with the reviewSeed data
const seedReview = async () => {
    try {
        await db.Review.deleteMany({});
        const data = await db.Review.insertMany(reviewSeed);
        console.log(`${data.length} Reviews inserted`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Associate the relative bandId to the user
const addIdToUser = async () => {
    try {
        // Get all users and bands
        const users = await db.User.find({});
        const bands = await db.Band.find({});

        // Storage arrays for user and band id's
        const userId= [];
        const bandId = [];
        
        // Pull out ids for users and bands then push to stor array
        users.forEach(user => {
            const { _id } = user;
            userId.push(_id)
        });

        bands.forEach(band => {
            const { _id } = band;
            bandId.push(_id)
        });

       // Iterate and assign a bandId to the user collection
        for (let i = 0; i < userId.length; i++) {
            try {
                const updateId = await db.User.findByIdAndUpdate(userId[i], { bandId: bandId[i] }, { new: true });
                console.log(`bandId: ${updateId.bandId} added to userName: ${updateId.userName}`);
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
       }     
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Associate the bandId's to their respective reviews and the reviewId's to the respective band. 
const addAuthorToReview = async () => {
    // Storage arrays for id data & db results
    const venueId = [];
    const bandId = [];
    const tempId = [];
    const results = [];
    const results2 = [];

    // Get all venues and bands
    const allVenues = await db.Venue.find({});
    const allBands = await db.Band.find({});
    const allReviews = await db.Review.find({});

    // Pull of the id's for each venue, review, & band then send to respective storage array
    allVenues.forEach(venue => { venueId.push(venue._id) });
    allBands.forEach(band => { bandId.push(band._id) });
    allReviews.forEach(review => { tempId.push(review._id) })

    // Divide the reviewId array into an array of 2 arrays
    const reviewId = [tempId.slice(0, 3), tempId.slice(3) ];
     
    // Iterate over the venues
    for (let i = 0; i < venueId.length; i++) {
        // Iterate over the venueReviews sub document
        for (let j = 0; j < bandId.length; j++) {
            try {
                // Associate the respective bandId to a review
                const addBandIdToReview = await db.Review.findOneAndUpdate(
                    { '_id': reviewId[i][j]},
                        { $set: 
                            {
                                'author': bandId[j],
                                'venue': venueId[i]
                            } 
                        }, { new: true });
                // Display log results
                console.log(`bandId: ${addBandIdToReview.author} added to reviewId: ${addBandIdToReview._id}`);
                
                // Associate the relative review id to the postedReviews in Bands
                const addReviewIdToBand = await db.Band.findByIdAndUpdate(bandId[j], 
                    { $push: 
                        {
                            postedReviews: reviewId[i][j]
                        }
                    }, { new: true });
                // Push results to stor array for display
                results.push(`reviewId's: [${addReviewIdToBand.postedReviews}] added to bandId: ${addReviewIdToBand._id}`);
                
                // Associate the relative review id to the venueReviews in Venues
                const addReviewIdToVenue = await db.Venue.findByIdAndUpdate(venueId[i],
                    { $push:
                        {
                            venueReviews: reviewId[i][j]
                        }
                    }, { new: true });
                // Push results to stor array for display
                results2.push(`reviewId's: [${addReviewIdToVenue.venueReviews}] added to venueId: ${addReviewIdToVenue._id}`);


            } catch (err) { console.error(err) }
        }
    }
    console.log('\nAssociate reviewIds to bands\n' + '-'.repeat(50));
    // Loop for displayed results
    for (let i = 3; i < results.length; i++){
        console.log(results[i])
    }
    console.log('\nAssociate reviewIds to venues\n' + '-'.repeat(50));
    console.log(results2[2]);
    console.log(results2[5]);
}


// Main seeder function
const seed = async () => {
  try {
      await seedUser();
      await seedBand();
      await seedVenue();
      await seedReview();
      console.log('\nAssociate bandId to userName\n' + '-'.repeat(50));
      await addIdToUser();
      console.log('\nAssociate bandIds to Reviews\n' + '-'.repeat(50));
      await addAuthorToReview();
      process.exit(0);
  } catch (err) {
      console.error(err);
      process.exit(1);
  }    
}

// Init seeding
seed();

