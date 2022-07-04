import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { getDatabase, ref ,update } from "firebase/database";
import { useState } from 'react';
import app from "../connectFirebase/firebase"
const db = getDatabase(app);
function Valve({modeValve, currentValve ,prevStatus}) {
    const [Mode,setMode] = useState(false)
    function updateMode(param){
        // const db = getDatabase();
        const data = {
            'ChageState/onValve':param
        }
        return update(ref(db),data)
    }

    function manualOnvalve(valve,status){
        // const db = getDatabase();
        const data = {}
        data['/statusValve/Valve'+valve+'/Status'] = status
        return update(ref(db),data)
    }
    // console.log();
    return (<>


           
               <BootstrapSwitchButton checked={Mode}
                        
                onstyle="success" offstyle="danger"
                onlabel='ON'
                offlabel='OFF'
                width={120} size="lg"
                onChange={(checked) => {
                
                    manualOnvalve(currentValve,checked)
                    updateMode(checked)
                    setMode(!Mode)
                }}
            />
          
                    
                



     








    </>)
}

export default Valve