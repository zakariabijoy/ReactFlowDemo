import  { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface  Props{
    data: any

}
export default memo(function CustomOperatorNode({ data } : Props){
  let isConnectable = true;
  const style= {background: '#CFFFE5', color: '#000000',border: '1px solid black', borderRadius:'3px', width:'50px', textAlign: 'center'}

  return (
    <>
    <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 13, background: '#000000' }}
        isConnectable={isConnectable}
      />
      <div style={{...style}}>
        {data.value}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: 13, background: '#000000' }}
        isConnectable={isConnectable}
      />
    </>
  );
});