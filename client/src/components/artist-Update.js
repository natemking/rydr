import React, { useState, useEffect } from 'react';
import CloudinaryWidget from './CloudinaryWidget';
import API from '../utils/API';
import ArtistEdit from './ArtistEdit';


const UpdateArtist = ({ match }) => {
    // State of artist object from DB
    const [artist, setArtist] = useState();
    // State of img upload status message
    const [msgToggle, setMsgToggle] = useState('none');
    
    // Retrieves artist data from the database to be used
    useEffect(() => {
        const fetchArtist = async () => {
            const result = await API.getBand(match.params.id)
            const userArtist = result.data
            setArtist(userArtist)
        }
        fetchArtist();
    }, [match.params.id]);

    // Cloudinary widget, send url results to the artist state
    const handleCloudResults = (results) => {
        setArtist({
            ...artist,
            bandImg: results.info.url
        });
        API.updateBandData(artist._id, { bandImg: results.info.url });
        setMsgToggle('block');
    }

    // Render Update artist profile screen
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="formcontent p-2">

                <h1 className="text-center">
                    Create Your Artist Profile
                </h1>

                <CloudinaryWidget onSuccess={ handleCloudResults } title='Add a pic'/>
                <h4 style={{ color: 'white', display: msgToggle }}>
                    Image uploaded!
                </h4>

                <ArtistEdit create={true} id={ match.params.id }/>

            </div>
        </div>
    )
}

export default UpdateArtist;