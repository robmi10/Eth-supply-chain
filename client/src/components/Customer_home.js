import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerscan from './customer/customer.js';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <Tab label="Scan" />
            </Tabs>
                <TabPanel value={value} index={0}> <Customerscan/> </TabPanel>
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

