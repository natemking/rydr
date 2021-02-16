import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalAlert = ({ show, handleClose, error }) => {
    // Render modal when book is saved
    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header>
                <Modal.Title>
                    Oh No!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong>{ error }</strong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={ handleClose }>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAlert;