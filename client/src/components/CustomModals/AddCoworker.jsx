import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COWORKER } from '../../utils/mutations';
import { QUERY_WORKSPACE } from '../../utils/queries';

import { Modal, Button, Form } from 'react-bootstrap';
import { UilPlus } from '@iconscout/react-unicons';

const CustomModal = () => {
  const { id, channelId } = useParams();
  const [addCoworker, { error }] = useMutation(ADD_COWORKER, {
    refetchQueries: [QUERY_WORKSPACE, 'workspace'],
  });

  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCoworker({
        variables: {
          email,
          workspaceId: id,
          channelId: channelId || null
        },
      });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        <UilPlus /> Add Coworkers
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD COWORKER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>User email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                onChange={handleInputChange}
                required
                autoFocus
              />
            </Form.Group>
          </Form>
          {error && <h4 className='text-danger'>Error...</h4>}
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
