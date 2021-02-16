import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import API from '../utils/API'
import ModalAlert from './Modal';




const CreateArtist = () => {
    // useHistory hook for routing
    let history = useHistory();
    //State for user data
    const [user, setUser] = useState([{
        'bandName': '',
        'location': '',
        'userName': '',
        'password': ''
    }]);
    // State for confirm password input element
    const [passToggle, setPassToggle] = useState('none');
    // State for user password confirm
    const [passCheck, setPassCheck] = useState('');
    // State for submit btn visibility 
    const [btnVisible, setBtnVisible] = useState('hidden');
    // State for modal error message
    const [errMsg, setErrMsg] = useState('');
    // State for modal visibility
    const [show, setShow] = useState(false);


    // Modal functions for closing and showing
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for setting user data to user sate
    const createArtist = e => {
        const target = e.target.name;
        const value = e.target.value;

        setUser({...user, [target]: value});
        // Show confirm password element when user first enters a password
        if (user.password) { setPassToggle('block') };
    }

    // Set state for the value of the confirm password
    const confirmPass = e => {
      setPassCheck(e.target.value);
    }

    // Handle submit btn visibility and POST user token to Google for reCaptcha verification upon passing the reCaptcha
    const captchaOnChange = (responseToken) => {
        setBtnVisible('visible');
        API.recaptchaUserVerify(responseToken);
    }
    
    // Submit user data to the DB
    const submitArtist = e => {
        e.preventDefault();
        // If users passwords don't match display modal and clear out the input fields
        if (user.password !== passCheck){
            document.getElementById('password').value='';
            document.getElementById('passCheck').value='';
            setErrMsg('Passwords do not match! Please try again.');
            handleShow();
        } else {
            (async () => {
                try {
                    // Create the user in the DB
                    const res = await API.createUser(user);
                    // If there is a duplicate email address display modal and clear email input field
                    if (res.data.errors) {
                        document.getElementById('userName').value = '';
                        setErrMsg(res.data.errors.userName.message);
                        handleShow();
                    }else{
                        // If no errors send uer to their bandpage
                        history.push(`/bandpage/${res.data._id}`)
                    }
                } catch (err) { console.error(err) }
            })();
        }
    }

    // Render the create user page
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <div className='formcontent p-2'>
            <h1 className='text-center'>Create Your Artist Profile</h1>
                <form onSubmit={submitArtist}>

                    <div className='form-group'>
                        <label htmlFor='bandName'>Artist/Band Name:</label>
                        <input type='text' className='form-control' id='bandName' aria-describedby='bandNameHelp' placeholder='Enter Name' name='bandName' onChange={createArtist} required></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='location'>Location (City, State):</label>
                        <input type='text' className='form-control' id='bandLocation' aria-describedby='location' placeholder='Enter Location' name='location' onChange={createArtist}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='userName'>Create Username:</label>
                        <input type='email' className='form-control' id='userName' aria-describedby='emailHelp' placeholder='Enter email for username' name='userName' onChange={createArtist} required></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Create Password:</label>
                        <input type='password' className='form-control' id='password' placeholder='Password' name='password' onChange={createArtist} required></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='passCheck' style={{ display: passToggle }}>Confirm Password:</label>
                        <input type='password' className='form-control' id='passCheck' placeholder='Confirm Password' name='passCheck' style={{display: passToggle }} onChange={ confirmPass } required></input>
                    </div>

                    <ModalAlert show={ show } handleClose={ handleClose } error={ errMsg }/>
                
                    <ReCAPTCHA
                        sitekey={ process.env.REACT_APP_GOOGLE_RECAP_SITE_KEY }
                        render='explicit'
                        onChange={ captchaOnChange }
                    />

                    <button type='submit' value={'Submit'} className='artistCreateButton'  style={{visibility: btnVisible }}>
                        Submit
                    </button>

                </form>

            </div>
        </div>
    
    )
}

export default CreateArtist;