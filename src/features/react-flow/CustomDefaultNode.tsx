import  { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Handle, Position } from 'reactflow';

interface  Props{
    data: any

}
export default memo(function CustomDefaultNode({ data } : Props){
  let isConnectable = true;
  const style= {
    background: '#F7B538',
    color: '#000000',
    border: '1px solid black', 
    borderRadius:'3px', 
    width:'auto', 
    textAlign: 'center', 
    height: '20px',  
    minHeight: '30px', 
    minWidth: '100px',
    paddingLeft: '10px',
    paddingRight: '10px'
  }

  return (
    <>
    <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 40, background: '#000000' }}
        isConnectable={isConnectable}
      />
      {/* <div style={{...style}}>
        {data.value}
      </div> */}

      <Card>
      <Card.Header>{data.label}</Card.Header>
      <Card.Body>
        <Card.Text>
          <div style={{...style}}>
          {data.value}
          </div> 
        </Card.Text>
      </Card.Body>
    </Card>
      
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: 40, background: '#000000' }}
        isConnectable={isConnectable}
      />
    </>
  );
});