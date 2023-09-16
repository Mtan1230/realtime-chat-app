import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { QUERY_ME } from '../../utils/queries';
import CreateWorkspace from '../CustomModals/CreateWorkspace';
import { ListGroup } from 'react-bootstrap';

const WorkspaceList = () => {
  const { loading, data } = useQuery(QUERY_ME);
  console.log(data);


  return (
    <>
      {loading ? <h1>loading...</h1> : <ListGroup>
        {data?.me.workspaces.map(w => {
          return <p key={w.name}>{w.name}</p>
        })}
        </ListGroup>}
      <CreateWorkspace />
    </>
  );
};
export default WorkspaceList;
