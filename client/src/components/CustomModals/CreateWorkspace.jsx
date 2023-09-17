import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';
import { CREATE_WORKSPACE } from '../../utils/mutations';

const CustomModal = () => {
  const [createWorkspace, { error }] = useMutation(CREATE_WORKSPACE);

  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createWorkspace({
        variables: {
          name,
        },
      });
      handleClose();
      window.location.assign(`/workspace/${response.data.createWorkspace._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        CREATE A NEW WORKSPACE
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW WORKSPACE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Workspace Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={name}
                onChange={handleInputChange}
                required
                autoFocus
              />
            </Form.Group>
          </Form>
          {error && <h4 className='text-danger'>Workspace name is exist</h4>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CustomModal;
