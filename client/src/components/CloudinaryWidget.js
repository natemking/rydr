import React, { useState } from 'react';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';

const CloudinaryWidget = (props) => {
    // State for widget btn display toggle per upload status
    const [btnToggle, setBtnToggle] = useState('block');    

    const onSuccess = results => { 
        props.onSuccess(results); 
        setBtnToggle('none');
    }
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
                buttonText={ props.title }
                style={{
                    color: 'white',
                    border: 'none',
                    width: '120px',
                    backgroundColor: '#343A40',
                    borderRadius: '4px',
                    height: '25px',
                    margin: '10px 0',
                    display: btnToggle
                }}
                cropping={ false }
                onSuccess={ onSuccess } 
                onFailure={ onFailure }
            />
        </>
    )
}

export default CloudinaryWidget;