import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import ColorSelectorNode from './features/react-flow/ColorSelectorNode';


const initBgColor = '#1A192B';

const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const initialNodes:any = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'a' , value: 'a'}, type: 'input', },
  { id: '2', position: { x: 300, y:0  }, data: { label: 'b', value: 'b' }, type: 'input',},
  { id: '3', position: { x: 150, y: 80 }, data: { label: '+', value: '+' }, type: 'default',},
  { id: '4', position: { x: 150, y: 150 }, data: { label: 'Output', value: 'Output'}, type: 'output',}
];
// const initialEdges = [{ id: 'e1-3', source: '1', target: '3', label: 'goes to' }, { id: 'e2-3', source: '2', target: '3', label: 'goes to' }];
const initialEdges:any[] = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [bgColor, setBgColor] = useState(initBgColor);

  const [outputValue, setOutputvalue] = useState('');

  useEffect(() => {
    const onChange = (event: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '5') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };
    
    setNodes([...initialNodes, {id: '5',
    type: 'selectorNode',
    data: { onChange: onChange, color: initBgColor },
    style: { border: '1px solid #777', padding: 10 },
    position: { x: 350, y: 70 },}])


    setEdges([
      ...initialEdges
    ]);
}, []);


const onConnect = useCallback(
  (params:any) =>{
  let source = nodes.find(x => x.id === params.source)?.data.value;
  let target = nodes.find(x => x.id === params.target)?.data.value;
  let latestOutputValue ='';
  setOutputvalue((p) => {
    console.log(source, p);
    if(p.includes('+')){
      latestOutputValue = p + source;
      return latestOutputValue;
    } 
    if(source.toString() === '+'){
      latestOutputValue = p;
      return latestOutputValue;
    }
    latestOutputValue = p + source + target;
    return latestOutputValue; 
  });

  setNodes([...initialNodes, { id: '4', position: { x: 150, y: 150 }, data: { label: latestOutputValue, value: latestOutputValue}, type: 'output',}])
  setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds))},
  []
);

useEffect(() => {
  console.log(outputValue)
}, [outputValue])

const reactFlowStyle = {
  background: bgColor,
  width: '100%',
  height: 300,
};



  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={reactFlowStyle}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}