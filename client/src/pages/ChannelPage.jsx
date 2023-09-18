import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import ChatContainer from '../components/ChatContainer';
import InputContainer from '../components/InputContainer';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const ChannelPage = () => {
  const [messages, setMessages] = useState([]);
  const { channelId } = useParams();
  // useEffect(() => {
  //   const { loading, data } = useQuery(QUERY_CHANNEL, {
  //     variables: {channelId},
  //   });
  // });
  console.log(messages);
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Container fluid className='channelContainer'>
      <ChatContainer message />
      <InputContainer addMessage={addMessage} />
    </Container>
  );
};
export default ChannelPage;
