import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL } from '../../utils/mutations';
import { QUERY_WORKSPACE } from '../../utils/queries';

import { Modal, Button, Form } from 'react-bootstrap';
import { UilPlus } from '@iconscout/react-unicons';

const CustomModal = () => {
  const { id } = useParams();
  const [createChannel, { error }] = useMutation(CREATE_CHANNEL, {
    refetchQueries: [QUERY_WORKSPACE, 'workspace'],
  });

  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChannel({
        variables: {
          name,
          public: isPublic,
          workspaceId: id,
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
        <UilPlus /> Add Channels
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW CHANNEL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={name}
                onChange={handleInputChange}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Select
              onChange={(e) => setIsPublic(e.target.value === 'true')}
            >
              <option value='true'>Public</option>
              <option value='false'>Private</option>
            </Form.Select>
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
