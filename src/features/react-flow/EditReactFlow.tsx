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

import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import CustomInputNode from './CustomInputNode';
import CustomOperatorNode from './CustomOperatorNode';
import CustomDefaultNode from './CustomDefaultNode';
import agent from '../../app/api/agent';
import { useNavigate, useParams } from 'react-router-dom';


const nodeTypes = {
    inputNode: CustomInputNode,
    operatorNode: CustomOperatorNode,
    defaultNode : CustomDefaultNode
  };
  
  const initialNodes:any[] = [];
  
  const initialEdges:any[] = [];

export default function EditReactFlow(){
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

    const [flowName, setFlowName] = useState('');

    const navigate = useNavigate();
    const {id} = useParams();
  
    const onChangeInputHandler = (event: any) => {
  
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

    useEffect( () => {

      const fetchData = async () => {
        const reactFlow = await agent.ReactFlow.getById(id!);
        console.log(reactFlow);

        function toCamelCase(key:any, value:any) {
          if (value && typeof value === 'object'){
            for (var k in value) {
              if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                delete value[k];
              }
            }
          }
          return value;
        }

        let reactFlowValue = JSON.parse(reactFlow.value, toCamelCase);
        console.log(reactFlowValue);
        reactFlowValue.nodes.forEach((e:any) => {
          if(e.type === 'inputNode'){
            e.data.onChangeInput = onChangeInputHandler;
          }
        });

        setNodes([
          ...initialNodes,
          ...reactFlowValue.nodes
     ])

       setEdges([
         ...initialEdges,
         ...reactFlowValue.edges
       ]);
      }
      fetchData();
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
      data: selectedNodeType === 'inputNode' ? {label: `${label}`,onChangeInput:onChangeInputHandler, value: `${value}`} : {label: `${label}`, value: `${value}`},
      position:{x: n[n.length-1].position.x, y: n[n.length-1].position.y +120},
      type: selectedNodeType
    }));
  };
  
  const update = () =>{
    agent.ReactFlow.update(id!, {flowName, nodes, edges}).then(() => navigate('/'));
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
          <Col style={{textAlign:"end"}}>
          <Form.Control 
              type="text" 
              onChange={e => setFlowName(e.target.value)} 
              name='flowName'
              placeholder='Flow Name'
            /> 
          </Col>
          <Col style={{textAlign:"end"}}>
          
          <Button variant="primary" type='button' onClick={update}>Update</Button>
          </Col>
        </Row>
        </Container>
      </div>
    );
}