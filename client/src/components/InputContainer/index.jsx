import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';

import { Form, InputGroup, Button } from 'react-bootstrap';

const InputContainer = (props) => {
  const [text, setText] = useState('');
  const {channelId} = useParams()

  const [sendMessage, {error}] = useMutation(SEND_MESSAGE)

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendMessage({
        variables: {
          text,
          channelId,
        }
      })

      setText('');
    } catch (e) {
      console.log(JSON.parse(JSON.stringify(e)));
    }
  }

  return (
    <InputGroup className='mb-3'>
      <Form.Control
        placeholder='Message'
        aria-label='Message'
        aria-describedby='basic-addon2' 
        value={text}
        onChange={handleInputChange}
      />
      <Button variant='outline-secondary' id='button-addon2' onClick={handleSubmit}>
        Button
      </Button>
    </InputGroup>
  );
};
export default InputContainer;
