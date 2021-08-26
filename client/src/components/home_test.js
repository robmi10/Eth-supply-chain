import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Supplyadd from './supply_add.js';
import Scan from './supply_scan.js';

import {AppBar, Toolbar, IconButton, Typography, Button, Hidden, Grid,} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'

const styles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

class HomeHeader extends Component {
    constructor(props){
        super(props);
            this.state = {
                value: 1
            };
    }
    
  handle_change = (value) => {
    this.setState({ value })
}

componentDidMount(){
    console.log("Customer sendtoparents->",this.props.location.state.eth_address)
    this.sendtoparents();
}

sendtoparents = () =>{
    console.log("Customer sendtoparents->",this.props.location.state.username)
    this.props.handleinputvalue(this.props.location.state.username, this.props.location.state.eth_address);
}

  render() {
    const { classes, value } = this.props
        let content_array = [<Supplyadd/>, <Scan/>];
        return (

            <div className="App">
                <Tabs value={this.state.value} onChange={(e, v) => { this.handle_change(v) }} indicatorColor="primary"
                    textColor="primary" centered>
                    <Tab value='1' label='Add'></Tab>
                    <Tab value='2' label='Scan'></Tab>
                </Tabs>
      
                    {content_array[this.state.value - 1]}
               
            </div>
    )
  }
}

export default withRouter(withStyles(styles)(HomeHeader))

