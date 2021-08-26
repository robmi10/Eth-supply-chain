import React from 'react'
import {Grid, Fab, Paper, Dialog, Button, DialogTitle, TextField, DialogContent, DialogActions} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import firebase from "./utils/firebase"
import Web3 from 'web3'
import Supply from "../contracts/Supply.json";
import {CONTRACT_ADRESS, HTTP_PROVIDER} from './config.js'
import QRCode from "react-qr-code";

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
class Supplygeo extends React.Component{
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
            is_shipped: ""
        }
    }

    loadblockchain_add_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS
        );
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();

        const Transaction_get_product = await contract.methods.get_index_product(1).call();
        console.log('Transaction_get_product', Transaction_get_product.product)
        console.log('Transaction_get_product', Transaction_get_product.quality.toNumber())

        const Transaction = await contract.methods.get_index_location().send({from: accounts[0], gas: 3000000});
        console.log('transaction', Transaction)

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

    handle_qrcode (){
        var React = require('react');
        var QRCode = require('qrcode.react');
        
        
        if(this.state.quality_grade > -1){
          
        return(
            <div className="App">
            <h4>Product: {this.state.Product}</h4>
            <h4>Quality: {this.state.quality_grade}</h4>
            <h4>Long: {this.state.longitude} Lat: {this.state.latitude}</h4>
            <QRCode value={this.state.id.toString()} />
            <p>{this.state.id}</p>
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

    render(){
        const { classes } = this.props;

      return (
        <div >
            <h2>Get Product History</h2>
            <Button onClick={this.handleopen}>
            <Fab color="green" aria-label="add">
                                <AddIcon />
                                </Fab>
            </Button>
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
                        }} color="primary">
                Submit
            </Button>
        </DialogActions>
        </Dialog>
        <Paper className={classes.paper}> 
            {this.handle_qrcode()}
        </Paper>
        </Grid>

   
        </div>
      
      );
    }
}
export default  withStyles(styles ) (Supplygeo);