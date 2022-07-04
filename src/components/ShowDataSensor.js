
import "../App.css"
import { Col } from "react-bootstrap";


const templateHeader = (index) => {
    // fontSize:"100px", 
    return {
        backgroundColor: pickColor(index),
        color: "white",
        borderRadius: "5px",

    }

}

const pickColor = (index) => {
    switch (index) {
        case "Active":
            return "green"
        case "Max":
            return "#EC350C"
        case "Min":
            return "#4051ce"
        case "Rain":
            return "#0C94EC"
        default:
            return "black"
    }
}

function ShowDataSensor({ SensorValue }) {
    let index = 0;
    return (<>

        {Object.keys(SensorValue).map((key) => {
            index += 1;
            console.log(SensorValue[key]);
            return (
                <Col xs={6} lg={3} key={index} >

                    <div className="valve-status-icon" >
                        <h3 style={templateHeader(key)}> {key}</h3>
                        <h4> {SensorValue[key]} {key!=="Rain"?"°C":"mm"}</h4>
                        
                    </div>

                </Col>

            )

        })
        }



    </>)
}

export default ShowDataSensor