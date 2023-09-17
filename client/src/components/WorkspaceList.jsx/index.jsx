import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';
import CreateWorkspace from '../CustomModals/CreateWorkspace';
import { ListGroup } from 'react-bootstrap';

const WorkspaceList = () => {
  const { loading, data } = useQuery(QUERY_ME);

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <ListGroup>
          {data?.me.workspaces.map((w) => {
            return (
              <ListGroup.Item action href={`/workspace/${w._id}`} key={w.name}>
                {w.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
      <CreateWorkspace />
    </>
  );
};
export default WorkspaceList;
