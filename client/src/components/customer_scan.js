import React from 'react'
import QrReader from 'react-qr-scanner'
import {Paper, Grid, Button, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Web3 from 'web3'
import {CONTRACT_ADRESS, HTTP_PROVIDER} from './config.js'
import Supply from "../contracts/Supply.json";
import {withRouter} from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GoogleMap from './googlemap';
import Fade from "@material-ui/core/Fade";
import Popper from "@material-ui/core/Popper";

        const styles   = theme => ({
            paper:{
                color: "rgb(83, 110, 233)",
                background: "rgb(253, 253, 253)",
                boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
                borderRadius: 40,
                height: 500,
                padding: 20,
                marginTop: 10,
                width: 400,
                direction:"column",
                alignItems:"center",
                justify:"center"
                

        
            },
            paper2:{
                color: "rgb(83, 110, 233)",
                background: "rgb(253, 253, 253)",
                boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
                borderRadius: 40,
                height: 250,
                width: 200,
                direction:"column",
                alignItems:"stretch",
                justify:"stretch"
                

        
            },
            root: {
                width: '100%',
                maxWidth: '36ch',
                backgroundColor: theme.palette.background.paper,
                direction:"column",
                alignItems:"center",
                justify:"center"
              },
              inline: {
                display: 'inline',
              },
        })
     
class Customerscan extends React.Component{
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
            screen_long: "",
            screen_lat: "",
            screen_id: "",
            screen_date: "",
            product_list: [],
            googleMapsApiKey: null,
            anchorEl: null, 
            open_popover: false

        }
        this.handleScan = this.handleScan.bind(this)
    }

    loadblockchain_get_location_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const product= this.state.Product;
       

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS
        );
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();


        console.log("ID--->", this.state.id)
        const Transaction_get_product = await contract.methods.get_new_locationid(this.state.id).call();
        console.log("Transaction_get_product ->", Transaction_get_product)

        Transaction_get_product.map((value, index)=>{
            console.log("inside loop ->", Transaction_get_product)

            this.setState({
                product_list: Transaction_get_product
            })
        })




        this.setState({
                screen_lat: Transaction_get_product[0].deviceid.toString(),
        }) 
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
            open: false,
            id: "41356982"
        })

        this.loadblockchain_get_location_truffle()
    }
   

    get_rows (){
        var React = require('react');
        var QRCode = require('qrcode.react');
            const { classes } = this.props;
            const currentlist = this.state.product_list
            const open = this.state.anchorEl === null ? false : true;
            console.log(this.state.anchorEl);
            console.log(this.state.open_popover);
            const id = this.state.open_popover ? "simple-popper" : null;
        
    if(this.state.screen_lat != ""){
            return(                
                <div className="App">
                     {currentlist.map((v)=>{     
                    return <List item xs={3} align="center" >
                    <ListItem>
                    
                    <ListItemAvatar>
                        <LocationOnIcon
                        aria-describedby={id}
                        variant="contained"
                        onMouseEnter={event => this.handlePopoverOpen(event)}
                        onMouseLeave={event => this.handlePopoverClose(event)}
                        color="secondary" alt="" src={<QRCode value={this.state.id} />} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Position"
                        secondary={
                        <React.Fragment>
                            <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                            >
                            DATE: {v.date}
                            </Typography>
                            <Typography
                            component="span"
                            variant="body3"
                            className={classes.inline}
                            color="textPrimary"
                            >
                            Longitude - {v.longitude} Latitude - {v.latitude}
                            </Typography>

                        <Popper
                            id={id}
                            open={this.state.open_popover}
                            anchorEl={this.state.anchorEl}
                            transition
                        >
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper className={classes.paper2}>

                                    <GoogleMap googleMapsApiKey={this.state.googleMapsApiKey}/>
                     
                                </Paper>
                            </Fade>
                            )}
                  </Popper>
                            
                            
                        </React.Fragment>
                        }
                    />
                    </ListItem>
                    </List>
                   
                  })}
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

  
    handleScan = (data) =>{
        const curr_data = data
        
        
        if(data != null){

        this.setState({
            open: false,
            id: curr_data.text
          })

          this.loadblockchain_get_location_truffle();
        }

      }

    
    handleError = (e) =>{
        console.log("Scan error", e)
    }

    onSuccess = (e) =>{
        console.log("Finished reading-->", e)
        
    }

    componentDidMount(){
        this.sendtoparents()
        this.setState({
          googleMapsApiKey: "AIzaSyDKBZRVQS6RN8UcMaxda0XcvbvqXc0vM0A"
      })

    }
    sendtoparents = () =>{
        this.props.handleinputvalue_2(this.props.location.state.username, this.props.location.state.eth_address);
    }

    handlePopoverOpen = (e)=>{
        this.setState({
            open_popover: true,
            anchorEl: e.currentTarget
        })
    }

    handlePopoverClose = (e)=>{
        this.setState({
            open_popover: false,
            anchorEl: null
        })
    }


    flipOpen = () => this.setState({ ...this.state, open_popover: !this.state.open_popover });
    handleClick = event => {
      this.state.ancherEl
        ? this.setState({ anchorEl: null })
        : this.setState({ anchorEl: event.currentTarget });
      this.flipOpen();
    };


    render(){
        const { classes } = this.props;
      return (
        <div className="App">
            
            <h2>Customer Scan Product</h2>
            <Button onClick={this.handleopen}>
            <Fab color="green" aria-label="add">
                <CameraAltIcon/>
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

        
        </div>
      
      );
    }
}
export default withRouter(withStyles(styles)(Customerscan))