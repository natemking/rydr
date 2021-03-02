import React from 'react';
import ArtistLinks from './artist-Links'
import ArtistEdit from './ArtistEdit';
import CloudinaryWidget from './CloudinaryWidget';
import API from '../utils/API'

const Artist = ({artist, isLoading, id, edit, handleEdit }) => {
    const userId = localStorage.getItem("id");
    const url = window.location.href;
    const bandId = url.substring(url.lastIndexOf('/') +1);

    // If band photo exists render it
    const renderImg = () => {
      if (artist.bandImg) { return ( <img alt="bandphoto" className="img-fluid bandphoto" src={ artist.bandImg } /> ) }
    }

    // If band links exist render them
    const renderBandLinks = () => {
      if (artist.bandLinks.length > 0) { return (<ArtistLinks artist={ artist } isLoading={isLoading} edit={ edit } />) }
    }

    // Handle Cloudinary results if user updates pic
    const handleCloudResults = (results) => {
        API.updateBandData(artist._id, { bandImg: results.info.url });
        window.location.reload();
    }

    // Render artist info. If in Edit mode the ArtistEdit component is rendered
    return isLoading ? (<h1>Loading....</h1>) : (
        <div className="d-flex flex-row flex-wrap align-items-center">
    
            <div className='d-flex flex-column'>
                { renderImg() }
                { edit ? <CloudinaryWidget  title='Update pic' onSuccess={ handleCloudResults }/> : null }
            </div>
            
            <div className="d-flex flex-column p-2 flex-wrap">
                { edit ? <ArtistEdit artist={ artist } id={ id } renderBandLinks= { renderBandLinks() } handleEdit={ handleEdit }/> :
                
                <>
                    <h1>
                        {artist.bandName}
                            { userId !== bandId ? null :
                                <span>
                                <i className="fa fa-pencil" aria-hidden="true" onClick={ handleEdit }></i>
                            </span>
                            }
                    </h1>
                    <h2>
                        {artist.location}
                    </h2>
                    <h3>
                        <u>Bio:</u>
                    </h3>
    
                    <div className="d-flex bandbio">
                        <p>{artist.bandBio}</p>
                    </div>
    
                    <p>
                        <u>Contact Info:</u>
                        <br />
                        <a href={"mailto:" + artist.contact}>
                            { artist.contact }
                        </a>
                    </p>
                

                { renderBandLinks() }
                </>
                }
            </div>

        </div>
    )
}

export default Artist;