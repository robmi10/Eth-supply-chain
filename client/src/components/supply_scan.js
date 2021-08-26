import React from 'react'
import QrReader from 'react-qr-scanner'
import {Paper, Grid, Card, Button, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Web3 from 'web3'
import Supply from "../contracts/Supply.json";
import {CONTRACT_ADRESS, HTTP_PROVIDER} from './config.js'
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import { motion } from "framer-motion";
import GoogleMap from './googlemap';

        const styles   = theme => ({
            paper:{
                color: "rgb(83, 110, 233)",
                background: "rgb(253, 253, 253)",
                boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
                borderRadius: 40,
                height: 500,
                padding: 20,
                marginTop: 10,
                width: 800,

        
            }
        })
        
class Scan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            open: false,
            Product: "",
            Quality: [1, 2, 3, 4, 5],
            longitude: "",
            latitude: "",
            quality_grade: 0,
            supply_list: [],
            new_list: [],
            scan_data: 0,
            screen_product: "",
            screen_quality: "",
            screen_long: "",
            screen_lat: "",
            screen_id: "",
            curr_longitude: "",
            curr_latitude: "",
            googleMapsApiKey: null,

        }
        this.handleScan = this.handleScan.bind(this)
    }

    handleopen = () =>{
        console.log("Inside open")
        this.setState({
            open: true
        })
    }

    handleclose = () =>{
        this.setState({
            open: false
        })
    }
    
    componentDidMount(){
            this.setState({
              googleMapsApiKey: "AIzaSyDM65ObR-3Vm6Y8kCmZ04h2gm2mkBhhKaw"
          })
    }

    get_rows = () =>{
        var React = require('react');
        var QRCode = require('qrcode.react');

        console.log("curr_id  -->" , this.state.id)
        console.log("list --->", this.state.new_list)

        if(this.state.screen_id != 0){
            const fadeLeft = {
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 }
              }
              
            return(
                <div className="App">
                    <motion.p
            variants={fadeLeft}
            initial='hidden'
            animate='visible'
            transition={{ duration: 1 }}
          >
            <h3 style={{ variant: "outlined"}}>Product: {this.state.screen_product}</h3>
            <h3 style={{ variant:"outlined"}}>Quality: {this.state.screen_quality}</h3>
            <h3 style={{ variant:"outlined"}}>Long: {this.state.screen_long} Lat: {this.state.screen_lat}</h3>
            <h4 style={{ variant:"outlined"}}>{this.state.screen_id}</h4>
            <QRCode value={this.state.id.toString()} />
                </motion.p>

                <Card  style ={{ position: 'relative',
               left:-50,
                 }}>
                
                    <GoogleMap googleMapsApiKey={this.state.googleMapsApiKey} 
                    />
                  
                        </Card> 
                </div>
                )
            }
        }
    

    handleopen = (e) =>{
        this.setState({
            open: true
        })
    }

    handle_id = (e) =>{
        console.log("id->", e.target.value)
        this.setState({
            id: e.target.value
        }) 
    }

    loadblockchain_get_product_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const product= this.state.Product;
        
        const curr_date = new Date().toLocaleString();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS
        );
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();
        console.log("ID--->", this.state.id)//25667394 99853284 53696285 44219460

        const Transaction_get_product = await contract.methods.get_index_product(this.state.id).call();
        
        console.log('Transaction_get_product', Transaction_get_product)
        console.log('Transaction_get_product', Transaction_get_product[0].toNumber())
        console.log('Transaction_get_product', Transaction_get_product[1].toString())
        console.log('Transaction_get_product', Transaction_get_product[2].toNumber())
        console.log('Transaction_get_product', Transaction_get_product[3].toString())
        console.log('Transaction_get_product', Transaction_get_product[4].toString())

        this.setState({
                  screen_product: Transaction_get_product[1].toString(),
                  screen_quality: Transaction_get_product[2].toNumber(),
                  screen_lat: Transaction_get_product[3].toString(),
                  screen_long: Transaction_get_product[4].toString(),
                  screen_id: Transaction_get_product[0].toNumber()
        })
        
        alert("sucessful transaction");
    }

    loadblockchain_set_location_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const product= this.state.Product;
        
        const curr_date = new Date().toLocaleString();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS
        );
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();


        console.log("curr_id--->", this.state.id)
        console.log("curr_latitude--->", this.state.curr_latitude)
        console.log("curr_longitude--->", this.state.curr_longitude)
        console.log("curr_date--->", curr_date)

        const Transaction_location = await contract.methods.set_curr_location(this.state.id, this.state.curr_latitude, this.state.curr_longitude, curr_date.toString()).send({from: accounts[0], gas: 4000000});;
        console.log('Transaction_location ---->', Transaction_location)

        alert("sucessful transaction");
    }

    handleScan = (data) =>{
        const curr_data = data
        
        if(data != null){
            this.loadblockchain_get_product_truffle();
            this.loadblockchain_set_location_truffle();
    
        console.log("Scan text 2 -->", curr_data.text)

        this.setState({
            open: false,
            id: curr_data.text
          })

        }
      }

    
    handleError = (e) =>{
        console.log("Scan error", e)
    }

    onSuccess = (e) =>{
        console.log("Finished reading-->", e)
        
    }

    handle_currlatitude = (e) =>{
        this.setState({
            curr_latitude: e.target.value
        })
    }

    handle_currlongitude = (e) =>{
        this.setState({
            curr_longitude: e.target.value
        })
    }

    render(){
        const { classes } = this.props;
      return (
        <div className="App">
             <Grow in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}>
            <h2>Scan Product</h2>
            </Grow>

            <Grow in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}>
            <Button onClick={this.handleopen}>
            <Fab color="green" aria-label="add">
                <CameraAltIcon/>
                </Fab>
            </Button>

            </Grow>
            
            <Grow in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}>
                <Grid  container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    >
             <Dialog
                open={this.state.open}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            ><DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <DialogContent>
                <TextField 
                       label="Latitude"
                       autoFocus 
                       onChange={this.handle_currlatitude}
                        />
                <TextField 
                       label="Longitude"
                       autoFocus 
                       onChange={this.handle_currlongitude}
                        />
                <QrReader
                    delay={500}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                    />
               
                </DialogContent>
                </DialogTitle>
                <DialogActions>
                        <Button autoFocus onClick={this.handleclose} color="primary">
                            Cancel
                        </Button>
                        <Button autoFocus  onClick={()=>{
                                        this.handleclose();
                                    }} color="primary">
                            Submit
                        </Button>
                </DialogActions>
            </Dialog>
        <Paper className={classes.paper}> 
          {this.get_rows()}
        </Paper>

        </Grid>
        </Grow>
        </div>
      
      );
    }
}
export default  withStyles(styles ) (Scan);