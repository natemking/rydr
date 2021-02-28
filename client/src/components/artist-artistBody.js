import React from 'react';
import ArtistLinks from './artist-Links'
import { Link } from 'react-router-dom';
import ArtistEdit from './ArtistEdit';
import CloudinaryWidget from './CloudinaryWidget';

const Artist = ({artist, isLoading, id, edit, handleEdit }) => {
    const userId = localStorage.getItem("id");
    const updateBandUrl = `/updateartist/${id}`;
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

    // Render artist info
    return isLoading ? (<h1>Loading....</h1>) : (
        <div className="d-flex flex-row flex-wrap align-items-center">
    
            <div className='d-flex flex-column'>
                { renderImg() }
                { edit ? <CloudinaryWidget  title='Update pic'/> : null }
            </div>
            
            <div className="d-flex flex-column p-2 flex-wrap">
                { edit ? <ArtistEdit artist={ artist } id={ id } renderBandLinks= { renderBandLinks() } /> :
                
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
                {/* {userId !== bandId ? null :
                <Link to={updateBandUrl} value={id}>
                    <button className="artistUpdateButton">Update Band Info</button>
                </Link>} */}
                </>
                }
            </div>

        </div>
    )
}

export default Artist;