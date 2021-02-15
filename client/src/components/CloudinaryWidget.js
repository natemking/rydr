import React from 'react';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';

const CloudinaryWidget = (props) => {
   
    const onSuccess = results => { props.onSuccess(results) }
    const onFailure =  err => console.error(err); 

    return (
        <>
            <WidgetLoader /> 
            <Widget
                sources={['local', 'camera', 'facebook', 'instagram']}
                sourceKeys={{ facebookAppId: '2dds35jdw21', instagramClientId: 'd7aadf962m' }}
                resourceType={'image'}
                cloudName={ process.env.REACT_APP_CLOUD_NAME }
                uploadPreset={ process.env.REACT_APP_UP_PRESET }
                buttonText={'Open'}
                style={{
                    color: 'white',
                    border: 'none',
                    width: '120px',
                    backgroundColor: 'green',
                    borderRadius: '4px',
                    height: '25px'
                }} // inline styling only or style id='cloudinary_upload_button'
                cropping={true} // set ability to crop images -> default = true
                onSuccess={ onSuccess } // add success callback -> returns result
                onFailure={ onFailure } // add failure callback -> returns 'response.error' + 'response.result'
                logging={false}
                //customPublicId={'sample'} // set a specific custom public_id. 
                // To use the file name as the public_id use 'use_filename={true}' parameter
                //eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'} // add eager transformations -> deafult = null
                use_filename={false}
            />
        </>
    )
}

export default CloudinaryWidget;