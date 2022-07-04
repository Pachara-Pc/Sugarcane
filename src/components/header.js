import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import '../App.css';
import { getDatabase, ref, onValue, update } from "firebase/database";
import app from "../connectFirebase/firebase"
import Valve from './valve';
import ShowStatusValve from './showStatusValve'
import ShowDataSensor from './ShowDataSensor'
import ShowInterval from  './ShowInterval'
import { useEffect, useState } from 'react';
import Clock from 'react-live-clock';
// import { async } from '@firebase/util';
// const current = 4;

const db = getDatabase(app);

const ValveStatus = {
    Valve1: {
        id: 1,
        status: false,
        flow: false
    },
    Valve2: {
        id: 2,
        status: false,
        flow: false
    },
    Valve3: {
        id: 3,
        status: false,
        flow: false
    },
    Valve4: {
        id: 4,
        status: false,
        flow: false
    }
}



function Header() {
    const initialConfig = {
        Interval: 0,
        Area: "",
        Valve: 0,
        pumpRate: 0,
        DAP: "",
        Time: ""
    }

    const initialTemp = {
        Max: 0,
        Min: 0,

    }

    const prevModeStatus = {
        Mode: true,
        Status: true,
        currentValve: 1

    }

    const [configValue, setConfigvale] = useState(initialConfig)
    const [mode, setMode] = useState(prevModeStatus);
    const [show, setShow] = useState(false);
    const [SensorValue, setSensorValue] = useState(initialTemp)
    const [allValve, setAllvalve] = useState(ValveStatus)
    const [interval, setInterval] =useState(0)
    const handleClose = () => { setShow(false) };
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        // console.log(name);
        // console.log(value);
        setConfigvale({
            ...configValue,
            [name]: value
        })
    }



    function fetchStatusVavle() {
        
        const starCountRef = ref(db, '/statusValve');
        onValue(starCountRef, async (snapshot) => {
            // let i = 0;
            const data = await snapshot.val();
            // i+=1;
            setAllvalve(data)
            // console.log(data);
            // console.log(i);
            
        })
    }

    function fetchMode() {
        const starCountRef = ref(db, '/ChageState');
        onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            // console.log(data);
            setMode((e => ({
                ...e,
                Mode: data.chageMode,
                Status: data.onValve
            })))
            // console.log("fetchMode");
            // console.log(mode);
        })
    }

    function fetchActiveData() {
        const starCountRef = ref(db, '/ActiveData');
        onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            console.log(data);
            setConfigvale(data.Config)
            setSensorValue(data.Temp)
            setSensorValue(e =>({...e,Rain:data.Rain.dailyRain}))
            setInterval(data.interval)
            // setCurrentvalve(data.currentPump)
            
            // console.log("fetchActiveData");
            setMode(e => ({
                ...e,
                currentValve: data.currentPump,

            }))
            // console.log(mode);
        })
       
    }


    function updateMode(params) {
        // const db = getDatabase();
        // console.log(mode);
        const data = {
            'ChageState/chageMode': params,
            'ChageState/onValve': false,
            'statusValve/Valve1/Status': false,
            'statusValve/Valve2/Status': false,
            'statusValve/Valve3/Status': false,
            'statusValve/Valve4/Status': false,
        }
        return update(ref(db), data)
    }

    function onSubmit(params) {
        const data = {
            'ActiveData/Config/Area': params.Area,
            'ActiveData/Config/DAP': params.DAP,
            'ActiveData/Config/Interval': params.Interval,
            'ActiveData/Config/Time': params.Time,
            'ActiveData/Config/Valve': params.Valve,
            'ActiveData/Config/pumpRate': params.pumpRate,

        }
        return update(ref(db), data)
    }

    useEffect(() => {
        fetchMode()
        fetchActiveData()
        fetchStatusVavle()


        // setInterval(()=>{
        //     console.log();
        // },1000)

    }, [])

    return (
        <Container className='header-bar'>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Setting</Modal.Title>
                    <i className="bi bi-arrow-clockwise" id="icon-restart" onClick={()=>{fetchActiveData()}}></i>
                </Modal.Header>
                <Modal.Body>
                    <Form  >
                        <Form.Group className="mb-3"  >
                            <Form.Label>Day Config</Form.Label>
                            <Form.Control

                                value={configValue.Interval}
                                name="Interval"
                                placeholder="Example : 1"
                                onChange={handleInputChange}
                            />
                            <Form.Label>Area</Form.Label>
                            <Form.Control
                                value={configValue.Area}
                                name="Area"
                                placeholder="Example : 1000"
                                onChange={handleInputChange}
                            />
                            <Form.Label>Valve</Form.Label>
                            <Form.Control
                                value={configValue.Valve}
                                name="Valve"
                                placeholder="Example : 1000"
                                onChange={handleInputChange}
                            />
                            <Form.Label>Pump rate </Form.Label>
                            <Form.Control
                                value={configValue.pumpRate}
                                name="pumpRate"
                                placeholder="Example : 1000"
                                onChange={handleInputChange}
                            />
                            <Form.Label>Day After Plant</Form.Label>
                            <Form.Control
                                value={configValue.DAP}
                                name="DAP"
                                placeholder="Example : 20/10/2022"
                                onChange={handleInputChange}
                            />
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                value={configValue.Time}
                                name="Time"
                                placeholder="Example : 9:30:00"
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={() => {
                            handleClose();
                            onSubmit(configValue)
                        }}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>





            <Row>



                <Col xs={9} md={11} >
                    <h4 >
                        <Clock className="template-card-date" format={'Mo dddd MMMM  YYYY   HH:mm:ss  '} ticking={true} timezone={'Asia/Bangkok'} />

                    </h4>
                </Col>
                <Col xs={3} md={1}>
                    <Button variant='info'>
                        <i className="bi bi-pencil-square" id="icon-edit" onClick={handleShow}></i>
                    </Button>
                </Col>
            </Row>
            <Row>
                
                <ShowInterval interval = {interval} currentValve={mode.currentValve} />
            </Row>
            <Row>
                 <ShowDataSensor SensorValue={SensorValue}/>
 
            </Row>

            <Row  style={{ marginTop: "20px" }}>

                <Col xs={5} md={3} style={{ marginTop: "10px" , marginLeft:"15px"}}><h3> Mode  </h3> </Col>

                <Col xs={5}  md={3}>
                    <BootstrapSwitchButton checked={mode.Mode}  
                        onstyle="success" offstyle="dark"
                        onlabel='AUTO'
                        offlabel='Manual'
                        width={120} size="lg"
                        onChange={() => {
                            // console.log(mode);
                            updateMode(!mode.Mode);
                            setMode(e => (
                                {
                                    ...e,
                                    Mode: !mode.Mode
                                }
                            ))
                            // console.log(mode);

                        }}
                        
                        />
                        
                </Col>

                {mode.Mode ? "" :
                    <>
                        <Col xs={5} md={2}  style={{ marginTop: "10px" , marginLeft:"15px"}}><h3> Valve  </h3> </Col>
                        <Col xs={5}  md={2}>
                            <Valve modeValve={mode.Mode} currentValve={mode.currentValve} />
                        </Col>
                    </>
                }








            </Row>
            <Row className="justify-content-center" >

            <ShowStatusValve AllvalveList={allValve}/>

            </Row>

        </Container>
    )
}

export default Header