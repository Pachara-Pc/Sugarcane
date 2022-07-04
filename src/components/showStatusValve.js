
import "../App.css"
import { Col } from "react-bootstrap";


const dotStyle = (status) => {
    // fontSize:"100px", 
    return {
        backgroundColor: status ? "green" : "red",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        margin: "0 auto"
        // textAlign: "center"
        // margin: "0 auto",
    }

    // paddingBottom: "20px"
}


function showStatusValve({ AllvalveList }) {
    // console.log(AllvalveList);
    return (<>



        {Object.keys(AllvalveList).map((key) => {
            // console.log();
            return (
                <Col xs={6} lg={3} key={AllvalveList[key].id} >
                    <div className="valve-status-icon" >
                        <h3>valve {AllvalveList[key].id}</h3>
                        <div style={dotStyle(AllvalveList[key].flow)} > </div>
                    </div>

                </Col>

            )

        })
        }




    </>)
}

export default showStatusValve