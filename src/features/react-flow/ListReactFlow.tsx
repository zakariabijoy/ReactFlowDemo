import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Container, Table } from "react-bootstrap";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";

export default function ListReactFlow() {
  const [listFlow, setListFlow] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    agent.ReactFlow.list().then((r: any) => setListFlow(r));
  }, []);

  function handleCreateButton(){
    navigate('/create');
  }

  function handleDelete(id: string){
    agent.ReactFlow.delete(id).then(() =>  setListFlow(listFlow.filter((x:any) => x.id !== id)));
  }

  function handleEdit(id: string){
    navigate(`/edit/${id}`);
  }

  return (
    <Container fluid>
      <Card>
        <Card.Header style={{textAlign:"end"}}>
          <Button variant="primary" size={"lg"} onClick={handleCreateButton} >
            Create
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listFlow &&
                listFlow.map((r: any) => (
                  <tr key={r.id}>
                    <td> {r.flowName} </td>
                    <td>{r.value}</td>
                    <td>
                      <ButtonGroup>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(r.id)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
