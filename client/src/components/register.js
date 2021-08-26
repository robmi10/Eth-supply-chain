import '../App.scss';
import React from 'react';
import Supply from "../contracts/Supply.json";
import Web3 from 'web3'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles } from '@material-ui/core/styles';
import {CONTRACT_ADRESS, HTTP_PROVIDER} from './config.js'
import Fade from '@material-ui/core/Fade';


const styles   = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class Register extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          id: Math.round(Math.random() * 100000000),
          profile_selection: ["Manager", "Customer"],
          current_profile: "Manager"
       
        }
    }

    loadblockchain_register_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const curr_user = this.state.username;
        const curr_password = this.state.password;
         
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];

        
        const contract = new web3.eth.Contract(
            Supply.abi, CONTRACT_ADRESS,
        );
        const accounts = web3.eth.getAccounts()
        const chainId = await web3.eth.getChainId();

        if(this.state.current_profile == "Manager"){

        const Transactionmanager = await contract.methods.create_manager(curr_user, curr_password).send({from: this.state.eth_address, gas: 4000000});
        console.log('Transactionmanager', Transactionmanager)
        }else{

        const Transaction_product = await contract.methods.create_customer(curr_user, curr_password).send({from: this.state.eth_address, gas: 4000000});
        console.log('Transaction_product', Transaction_product)

        }        
        alert("sucessful register");

        
    }

    handle_profile_selection = (e) =>{

      this.setState({
        current_profile: e.target.value
      })
    }

    componentDidMount= async () =>{
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        console.log("WEB3 -->",web3)
        const accounts = await web3.eth.getAccounts()
        console.log("curr accounts ->", accounts)
        this.setState({
            eth_address: accounts[0]
        })
    }

  
    handle_username = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    handle_password = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
  
     
    render(){
        const { classes } = this.props;
      return (
<div>

        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Fade in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1500 } : {})}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        </Fade>
        <Fade in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1500 } : {})}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        </Fade>

        <Fade in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1500 } : {})}>
        <form className={classes.form} noValidate>

        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Account selection"
                            onChange={this.handle_profile_selection}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your account"
                            variant="outlined"
                            
                            >

                          {this.state.profile_selection.map((option) => (
                                <option>
                                    {option}
                                </option>
                            ))}
                            
                        </TextField>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth  
            label="Username"
            autoFocus
            onChange = {this.handle_username}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type = 'password'
            label="Password"
            autoComplete="current-password"
            onChange = {this.handle_password}
          />

             <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type = 'password'
            label="Repeat Password"
            autoComplete="current-password"
            onChange = {this.handle_password}
          />    
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick ={this.loadblockchain_register_truffle}
            
          >Register
            
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
        </Fade>
      </div>
      
    </Container>
    </div>
      );
    }
    }
    
    export default withStyles(styles) (Register);