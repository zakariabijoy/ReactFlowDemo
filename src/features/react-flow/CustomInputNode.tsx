import  { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Handle, Position } from 'reactflow';

interface  Props{
    data: any

}
export default memo(function CustomInputNode({ data } : Props){
  let isConnectable = true;
  const style= {background: '#75E4B3', color: '#000000',border: '1px solid black', borderRadius:'15px', width:'200px', paddingLeft: '10px'}

  return (
    <>
      <Card>
        <Card.Header>{data.label}</Card.Header>
        <Card.Body>
          <Card.Text>
          <input name={data.label} type="text" onChange={data.onChangeInput} value={data.value} style={style}/> 
          </Card.Text>
        </Card.Body>
      </Card>
      
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 40, background: '#000000' }}
        isConnectable={isConnectable}
      />
      {/* <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      /> */}
    </>
  );
});