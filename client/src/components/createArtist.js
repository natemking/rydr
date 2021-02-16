import React, { useState, useRef } from 'react';
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
    // State for bg color for password input
    const [passColor, setPassColor] = useState('');
    // State for bg color for confirm password input
    const [confirmPassColor, setConfirmPassColor] = useState('');
    // State for password requirements message
    const [msgToggle, setMsgToggle] = useState('hidden');
    // State for password validation of password strength
    const [passStrength, setPassStrength] = useState(false);
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

    // useRef for password strength validation
    const passwordEl = useRef('');
    const confirmPassEl = useRef('');

    // Modal functions for closing and showing
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for setting user data to user sate
    const createArtist = e => {
        const target = e.target.name;
        const value = e.target.value;

        setUser({...user, [target]: value});
    }

    // Validate password strength
    const validPass = () => {
        // Regex for pw strength requirements
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/;
        const { value } = passwordEl.current;
        // Show pw requirements message
        setMsgToggle('visible');

        // If pw requirements met show password confirm input & change bg color to green
        if (regex.test(value)) {
            setPassToggle('block');
            setPassColor('rgb(128, 255, 128)');   
        } else { 
            setPassToggle('none'); 
            setPassColor('rgb(255, 153, 153)');
        }
    }

    // Set state for the value of the confirm password
    const confirmPass = () => {
        const { value } = confirmPassEl.current;
        // If confirm pw matches pw, change confirm pw bg color to green & set state for requirement strength to passing
        if( value === user.password ) {
            setConfirmPassColor('rgb(128, 255, 128)');
            setPassStrength(true);
        } else { setConfirmPassColor('rgb(255, 153, 153)') }
        
        // Set password to state
        setPassCheck(value);
    }

    // If password passes requirements, handle submit btn visibility and POST user token to Google for reCaptcha verification 
    const captchaOnChange = (responseToken) => {
        if (passStrength) {
            setBtnVisible('visible');
            API.recaptchaUserVerify(responseToken);
        } 
    }
    
    // Submit user data to the DB
    const submitArtist = e => {
        e.preventDefault();
        // If users passwords don't match display modal, clear out the input fields, change pw fields back to white, hide confirm pw input, and set state of password requirement to fail. 
       if (user.password !== passCheck){
            document.getElementById('password').value='';
            document.getElementById('passCheck').value='';
            setErrMsg('Passwords do not match! Please try again.');
            setPassColor('');
            setConfirmPassColor('');
            setPassToggle('none');
            setPassStrength(false);
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
                    }else {
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
                        <label htmlFor='bandName'>
                            Artist/Band Name:
                        </label>
                        <input type='text' className='form-control' id='bandName' aria-describedby='bandNameHelp' placeholder='Enter Name' name='bandName' onChange={createArtist} required></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='location'>
                            Location (City, State):
                        </label>
                        <input type='text' className='form-control' id='bandLocation' aria-describedby='location' placeholder='Enter Location' name='location' onChange={createArtist}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='userName'>
                            Create Username:
                        </label>
                        <input type='email' className='form-control' id='userName' aria-describedby='emailHelp' placeholder='Enter email for username' name='userName' onChange={ createArtist } required></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>
                            Create Password:
                        </label>
                        <input type='password' className='form-control' id='password' placeholder='Password' name='password' onChange={ createArtist } onInput={ validPass } ref={passwordEl} style={{ backgroundColor: passColor }} required></input>
                        <p style={{ fontSize: '12px', margin: '0 5px', visibility: msgToggle }}>min 8 chars - one upper, lower, number, & symbol</p>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='passCheck' style={{ display: passToggle }}>
                            Confirm Password:
                        </label>
                        <input type='password' className='form-control' id='passCheck' placeholder='Confirm Password' name='passCheck' style={{ display: passToggle, backgroundColor: confirmPassColor }} onChange={ confirmPass } ref={ confirmPassEl } required></input>
                    </div>

                    <ModalAlert show={ show } handleClose={ handleClose } error={ errMsg }/>
                
                    <ReCAPTCHA
                        sitekey={ process.env.REACT_APP_GOOGLE_RECAP_SITE_KEY }
                        render='explicit'
                        onChange={ captchaOnChange }
                        style={{ display: passStrength ? 'block' : 'none' }}
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