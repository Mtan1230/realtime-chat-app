import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import ChatContainer from '../components/ChatContainer';
import InputContainer from '../components/InputContainer';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_CHANNEL } from '../utils/queries';

const ChannelPage = () => {
  const [messages, setMessages] = useState([]);
  const { channelId } = useParams();
  const {loading, data} = useQuery(QUERY_CHANNEL, {
    variables: { id: channelId },
  });

  const channelMessages = data?.channel.messages || []
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Container fluid className='channelContainer'>
      <ChatContainer
        addMessage={addMessage}
        messages={messages}
        channelMessages={channelMessages}
      />
      <InputContainer addMessage={addMessage} />
    </Container>
  );
};
export default ChannelPage;
