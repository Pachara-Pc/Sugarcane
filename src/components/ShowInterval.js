

import "../App.css"
import { Col } from "react-bootstrap";


const templateInterval = (index) => {
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

function ShowDataSensor({ interval,currentValve }) {
    let index = 0;
    return (<>
    <div className="template-card">
       <h5>Current Valve : {currentValve}  </h5> 
        {/* : Interval  {interval} / 4 */}
    </div>
    



    </>)
}

export default ShowDataSensor