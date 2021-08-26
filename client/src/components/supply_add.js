import React from 'react'
import {Grid, Fab, Paper, Dialog, Button, DialogTitle, TextField, DialogContent, DialogActions} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import firebase from "./utils/firebase"
import Web3 from 'web3'
import Supply from "../contracts/Supply.json";
import {CONTRACT_ADRESS, HTTP_PROVIDER} from './config.js'
import QRCode from "react-qr-code";
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import { motion } from "framer-motion";

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
class Supplyadd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: Math.round(Math.random() * 100000000),
            open: false,
            Product: "",
            Quality: [0, 1, 2, 3, 4, 5],
            Shipped: ["No", "Yes"],
            longitude: "",
            latitude: "",
            quality_grade: -1,
            is_shipped: "",
            show_div: false
        }
    }

    loadblockchain_add_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const product= this.state.Product;
        const quality_grade= this.state.quality_grade;
        const longitude= this.state.longitude;
        const latitude= this.state.latitude;
        const supply_id= this.state.id;

        const curr_date = new Date().toLocaleString()

        console.log("product--->", product)
        console.log("quality_grade--->", quality_grade)
        console.log("longitude--->", longitude)
        console.log("latitude--->", latitude)
        console.log("supply_id--->", supply_id)

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS
        );
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();

        const Transaction = await contract.methods.create_product(supply_id, product, quality_grade, latitude, longitude).send({from: accounts[0], gas: 4000000});
        console.log('transaction->', Transaction)
        alert("sucessful transaction");
    }

    loadblockchain_add_location_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const product= this.state.Product;
        const quality_grade= this.state.quality_grade;
        const longitude= this.state.longitude;
        const latitude= this.state.latitude;
        const supply_id= this.state.id;

        const curr_date = new Date().toLocaleString()

        console.log("product--->", product)
        console.log("quality_grade--->", quality_grade)
        console.log("longitude--->", longitude)
        console.log("latitude--->", latitude)
        console.log("supply_id--->", supply_id)

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS
        );
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();

        const Transaction_location = await contract.methods.create_location("41356982", latitude, longitude, curr_date).send({from: accounts[0], gas: 4000000});
        console.log('Transaction_location->', Transaction_location)
        alert("sucessful transaction");
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


    submit_firebase(){
        const supply_db = firebase.database().ref('supplyeth');
        const supply_item = {
            product: this.state.Product,
            quality_grade: this.state.quality_grade,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            supply_id: this.state.id
        }
        supply_db.push(supply_item);

    }

    handle_qrcode (){
        var React = require('react');
        var QRCode = require('qrcode.react');
        
        
        if(this.state.show_div == true){
            const fadeLeft = {
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 }
              }
        return(
            <div className="App" >
           <motion.p
            variants={fadeLeft}
            initial='hidden'
            animate='visible'
            transition={{ duration: 1 }}
          >
            <h3 style={{ variant: "outlined"}}>Product: {this.state.Product}</h3>
            <h3 style={{ variant:"outlined"}}>Quality: {this.state.quality_grade}</h3>
            <h3 style={{ variant:"outlined"}}>Long: {this.state.longitude} Lat: {this.state.latitude}</h3>
            <QRCode value={this.state.id.toString()} />
            <h4 style={{ variant:"outlined"}}>{this.state.id}</h4>

            </motion.p>
            </div>
        )
    }
    }

    handle_product = (e) =>{
        this.setState({
            Product: e.target.value
        })
    }

    handle_quality = (e) =>{
        this.setState({
            quality_grade: e.target.value
        })
    }

    handle_shipped = (e) =>{
        this.setState({
            is_shipped: e.target.value
        })
    }

    handle_longitude = (e) =>{
        this.setState({
            longitude: e.target.value
        })
    }
    handle_latitude = (e) =>{
        this.setState({
            latitude: e.target.value
        })
    }

    handle_show_div = () =>{
        this.setState({
            show_div: true
        })
    }

    render(){
        const { classes } = this.props;
     

      return (
        <div >
        <Grow in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}>
            <h2>Add Product</h2>
        </Grow>
        <Grow  in={true}  style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}>
            <Button onClick={this.handleopen}>
            <Fab color="green" aria-label="add">
                                <AddIcon />
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
                            variant="outlined"
                            margin="normal"
                            required 
                            fullWidth 
                            label="Product"
                            autoFocus 
                            onChange={this.handle_product}
                        />       
                        
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Quality grade"
                            onChange={this.handle_quality}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your qualty grade"
                            variant="outlined"
                            >
                            {this.state.Quality.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Shipped"
                            onChange={this.handle_shipped}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select shipping status"
                            variant="outlined"
                            >
                            {this.state.Shipped.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        
        </DialogContent>
        </DialogTitle>
        
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <DialogActions>
                <DialogContent>
                    <form noValidate>
             <TextField 
                            variant="outlined"
                            margin="normal"
                            required 
                            label="Longitude"
                            autoFocus 
                            onChange={this.handle_longitude}
                        />
              <TextField 
                            variant="outlined"
                            margin="normal"
                            required 
                            label="Latitude"
                            autoFocus 
                            onChange={this.handle_latitude}
                        />
                    </form>
                    </DialogContent>
        </DialogActions>
        </DialogTitle>

        <DialogActions>
            <Button autoFocus onClick={this.handleclose} color="primary">
                Cancel
            </Button>
            <Button autoFocus  onClick={()=>{
                            this.handleclose();
                            this.loadblockchain_add_truffle();
                            this.loadblockchain_add_location_truffle();
                            this.handle_show_div();
                        }} color="primary">
                Submit
            </Button>
        </DialogActions>
        </Dialog>
        <Paper className={classes.paper}> 
            {this.handle_qrcode()}
        </Paper>
        </Grid>
        </Grow>
   
        </div>
      
      );
    }
}
export default  withStyles(styles ) (Supplyadd);