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

class Login extends React.Component {
      constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            profile_selection: ["Manager", "Customer"],
            current_profile: "Manager",
            check: false
        }
    }

 
    loadblockchain_login_truffle= async ()=>{
        console.log('INSIDE loadblockchain_register_truffle')
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);
        const curr_user = this.state.username;
        const curr_password = this.state.password;

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Supply.networks[networkId];
        const contract = new web3.eth.Contract(
            Supply.abi, deployedNetwork.address
        );
        const accounts = this.state.eth_address
        const chainId = await web3.eth.getChainId();
        if(this.state.current_profile == "Manager"){
        const Transaction_manager = await contract.methods.log_in_manager(curr_user, curr_password).call();

        this.handle_login(Transaction_manager, curr_user);

        }else{

        const Transaction_product = await contract.methods.log_in_customer(curr_user, curr_password).call();
        this.handle_customer_login(Transaction_product, curr_user);

        }
        alert("sucessful transaction");
    }

    componentDidMount= async () =>{
        const web3 = new Web3(Web3.givenProvider || HTTP_PROVIDER);

        const accounts = await web3.eth.getAccounts()
        this.setState({
            eth_address: accounts[0]
        })
    }

    handle_profile_selection = (e) =>{

      this.setState({
        current_profile: e.target.value
      })
    }

    handle_login (status, curr_user){
      if(status == true){
        this.props.history.push(`/manager_home`, {id: this.state.id, username: curr_user , eth_address: this.state.eth_address} ); 
      }
    }

    handle_customer_login (status, curr_user){
      if(status == true){
        this.props.history.push(`/customer_home`, {id: this.state.id, username: curr_user , eth_address: this.state.eth_address} ); 
      }
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
          Sign in
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
            onChange ={this.handle_username}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange ={this.handle_password}
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
            onClick ={this.loadblockchain_login_truffle}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        </Fade>
      </div>
      <Box mt={8}>
    
      </Box>
    </Container>
      );
    }
    }
    
    export default withStyles(styles ) (Login);