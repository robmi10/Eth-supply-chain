import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Supplyadd from './components/supply_add.js';
import Scan from './components/supply_scan.js';
import Supplygeo from './components/supply_geo.js';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CenteredTabs =props =>{
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let history = useHistory();
  let location = useLocation();
  props.handleinputvalue(location.state.username, location.state.eth_adress);
  //console.log("props->", props)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    sendtoparents();
  });
    function sendtoparents () {
      console.log("Username sendtoparents->", location.state.eth_adress)

      
      
     
    
    };

  return (
    <div className="App">     
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Add" />
                <Tab label="Scan" />
         
            </Tabs>
                <TabPanel value={value} index={0}> <Supplyadd/> </TabPanel>
                <TabPanel value={value} index={1}> <Scan/> </TabPanel>
              
        </div>
 
  );
  function TabPanel(props) {
    const {children, value, index}=props
        return(
            <div>
                {
                    value===index &&(
                        <h1>{children}</h1>
                    )
                }
            </div>
        )
    }
}

export default CenteredTabs
