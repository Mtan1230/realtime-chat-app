import { useSubscription } from '@apollo/client';
import { MESSAGE_SUBSCRIPTION } from '../../utils/subscriptions';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ChatContainer = (props) => {
  const { channelId } = useParams();
  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { channelId },
  });
  // const [newMessages, setNewMessages] = useState([]);
  useEffect(() => {
    // setNewMessages([...newMessages, data.messageAdded])
    if (loading) {
      return;
    }
    props.addMessage(data.messageCreated);
  }, [data]);

  return (
    <div className='chatContainer'>
      {props.channelMessages.map((m) => (
        <div key={m._id}>
          <h5>
            {m.createdBy.firstName} {m.createdBy.lastName} {m.createdAt}
          </h5>
          <p>{m.content}</p>
        </div>
      ))}
      <h5>---------------------new-----------------</h5>
      {props.messages.map((m) => (
        <div key={m._id}>
          <h5>
            {m.createdBy.firstName} {m.createdBy.lastName} {m.createdAt}
          </h5>
          <p>{m.content}</p>
        </div>
      ))}
    </div>
  );
};
export default ChatContainer;
