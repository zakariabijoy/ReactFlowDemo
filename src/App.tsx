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
import CustomInputNode from './features/react-flow/CustomInputNode';
import CustomOperatorNode from './features/react-flow/CustomOperatorNode';
import CustomDefaultNode from './features/react-flow/CustomDefaultNode';
import ColorSelectorNode from './features/react-flow/ColorSelectorNode';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';


const nodeTypes = {
  inputNode: CustomInputNode,
  operatorNode: CustomOperatorNode,
  defaultNode : CustomDefaultNode,
  colorSelectorNode: ColorSelectorNode
};

const initialNodes:any[] = [
  // { id: '1', position: { x: 0, y: 0 }, data: { label: 'a' , value: 'a'}, type: 'input', },
  // { id: '2', position: { x: 0, y:50  }, data: { label: 'b', value: 'b' }, type: 'input',},
  // { id: '7', position: { x: 0, y: 100  }, data: { label: 'c', value: 'c' }, type: 'input',},
  // { id: '1', position: { x: 350, y: 50 }, data: { label: '+', value: '+' }, type: 'operatorNode',},
  // { id: '2', position: { x: 350, y: 100 }, data: { label: '/', value: '/' }, type: 'operatorNode',},
  // { id: '3', position: { x: 350, y: 150 }, data: { label: '(', value: '(' }, type: 'operatorNode',},
  // { id: '4', position: { x: 350, y: 200 }, data: { label: ')', value: ')' }, type: 'operatorNode',},
  // { id: '5', position: { x: 550, y: 90 }, data: { label: 'Output', value: ''}, type: 'defaultNode',},
];

//const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: 'goes to' }, { id: 'e2-7', source: '2', target: '7', label: 'goes to' }];
const initialEdges:any[] = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [inputNodeData, setInputNodeData] = useState({
    input1: "chiller1power",
    input2: "chiller2power",
    input3: "chillerpump1power",
    input4: "chillerpump2power",
    input5: "condenserpump1power",
    input6: "condenserpump2power",
    input7: "coolingtower1power",
    input8: "coolingtower2power",
  })
   const [value, setValue] = useState('');
   const [label, setLabel] = useState('');
   const [selectedNodeType, setSelectedNodeType] = useState('inputNode');

  const [outputValue, setOutputvalue] = useState('');

  useEffect(() => {
   
    const onChangeInput = (event: any) => {

      setNodes((nds) =>
        nds.map((node) => {
          if (node.type !== 'inputNode') {
            return node;
          }
          if(node.data.label !== event.target.name){
            return node;
          }

          
          const { name, value } = event.target;
          setInputNodeData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));

          return {
            ...node,
            data: {
              ...node.data,
              value
              ,
            },
          };
        })
      );
    };
    
    setNodes([
       ...initialNodes,
    { id: '1', position: { x: 0, y: 20 }, data: { label: 'input1', onChangeInput, value:inputNodeData.input1  }, type: 'inputNode',},
    { id: '2', position: { x: 0, y: 140 }, data: { label: 'input2', onChangeInput, value:inputNodeData.input2   }, type: 'inputNode',},
    { id: '3', position: { x: 0, y: 260 }, data: { label: 'input3', onChangeInput, value:inputNodeData.input3   }, type: 'inputNode',},
    { id: '4', position: { x: 0, y: 380 }, data: { label: 'input4', onChangeInput, value:inputNodeData.input4   }, type: 'inputNode',},
    { id: '5', position: {x: 0, y: 500 }, data: { label: 'input5', onChangeInput, value:inputNodeData.input5   }, type: 'inputNode',},
    { id: '6', position: {x: 0, y: 620 }, data: { label: 'input6', onChangeInput, value:inputNodeData.input6   }, type: 'inputNode',},
    { id: '7', position: {x: 0, y: 740 }, data: { label: 'input7', onChangeInput, value:inputNodeData.input7   }, type: 'inputNode',},
    { id: '8', position: {x: 0, y: 860 }, data: { label: 'input8', onChangeInput, value:inputNodeData.input8   }, type: 'inputNode',},
  ])


    setEdges([
      ...initialEdges
    ]);
}, []);


const onConnect = useCallback(
  (params:any) =>{
  console.log(params);
  
  let source = nodes.find(x => x.id === params.source);
  let target = nodes.find(x => x.id === params.target);

  if(target?.type==='operatorNode'){
    if(source?.type==='defaultNode'){
      setOutputvalue((p) => {
        console.log('source:' + source?.data.label, ',target:' + target?.data.value);
        return p + source?.data.label + target?.data.value;
      });
    }else{
      setOutputvalue((p) => {
        console.log('source:' + source?.data.value, ',target:' + target?.data.value);
        return p + source?.data.value + target?.data.value;
      });
    }
  }
  
  
  if(target?.type==='defaultNode'){
    let lastChar = outputValue.slice(-1); 
    let targetValue='';
    if(lastChar === '+' || '-'){
      targetValue = outputValue.substring(0, outputValue.length - 1);
      setOutputvalue(targetValue);
    }
    let index = nodes.indexOf(target);
    if(index !== -1)
      nodes[index] = {...target!, data: {...target!.data, value:targetValue }};
    setNodes([...nodes])
    console.log(nodes);
    setOutputvalue('');
  }

  setEdges((eds) => addEdge({ ...params},eds))
},
  [nodes, edges]
);

useEffect(() => {
  console.log(outputValue)
}, [outputValue])

const reactFlowStyle = {
  background: "#ffffff",
  width: '100%',
  maxHeight: '94%',
};


const addNode = () =>{
  setNodes(n => n.concat({
    id: (n.length + 1).toString(),
    data: {label: `${label}`, value: `${value}`},
    position:{x: n[n.length-1].position.x, y: n[n.length-1].position.y +120},
    type: selectedNodeType
  }));
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
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
      <Container fluid>
      <Row>
        <Col>
        <Form.Select  
          value={selectedNodeType}
          onChange={e => setSelectedNodeType(e.target.value)}
          >
          <option value="inputNode">Input Node</option>
          <option value="defaultNode">Default Node</option>
          <option value="operatorNode">OperatorNode</option>
        </Form.Select>
        </Col>
        <Col>
          <Form.Control 
            type="text" 
            onChange={e => setLabel(e.target.value)} 
            name='label'
            placeholder='Set Label'
          />
          
        </Col>
        <Col>
          <Form.Control 
            type="text" 
            onChange={e => setValue(e.target.value)} 
            name='value'
            placeholder='Insert Value'
          /> 
        </Col>
        <Col>
        <Button variant="primary" type='button' onClick={addNode}>Add Node</Button>
        </Col>
      </Row>
      </Container>
    </div>
  );
}