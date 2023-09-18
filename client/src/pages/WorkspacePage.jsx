import { useParams, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_WORKSPACE } from '../utils/queries';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { UilLock } from '@iconscout/react-unicons';
import CreateChannel from '../components/CustomModals/CreateChannel';
const WorkspacePage = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_WORKSPACE, {
    variables: { id: id },
  });
  const channels = data?.workspace.channels || null;

  return (
    <>
      <Container fluid className=''>
        <Row className='vh-100'>
          <Col xs={4} md={3} className='py-5 bg-primary'>
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <ListGroup as='ul'>
                {channels &&
                  channels.map((c) => {
                    return (
                      <ListGroup.Item
                        key={c._id}
                        action
                        href={`/workspace/${id}/${c._id}`}
                      >
                        {c.public ? '#' : <UilLock />} {c.name}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            )}
            <CreateChannel />
          </Col>
          <Col xs={8} md={9} className='py-5 bg-primary-subtle'>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default WorkspacePage;
