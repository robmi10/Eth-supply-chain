import {AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles } from '@material-ui/core/styles';
import React from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom'
import Jdenticon from 'react-jdenticon';
import {withRouter} from 'react-router-dom'

        const styles   = theme => ({
            root: {
                flexGrow: 1,
              },
              menuButton: {
                marginRight: theme.spacing(2),
              },
              title: {
                flexGrow: 1,
              },
        })
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            open: false,
            curr_eth_addr: "",
            login_status: false,
            curr_customer_user: "",
            curr_manager_user: "",
            curr_user: ""
        }
    }

    handle_open = () =>{

      this.setState({
        open: true
      })
    }

    handle_close = () =>{

      this.setState({
        open: false
      })
    }

    handle_menu_open = ()=>{
      this.setState({
          open: true
      })
  }

  handle_menu_close = ()=>{
    this.setState({
        open: false
    })
}

handle_logout = () =>{

localStorage.clear()
  console.log("Inside handle logout!!")
  this.setState({
    login_status: false,

})

}


componentWillReceiveProps(){    
  if(this.props.manager_username != ""){
  this.setState({
    curr_eth_addr : this.props.manager_eth_address
  })
}


else if(this.props.customer_username != ""){
  this.setState({
    curr_eth_addr : this.props.customer_eth_address
  })
}
}


    nav_handle(){
      const { classes } = this.props;

      if(localStorage.getItem("username") != null){
     
        return(
          <div className="App">
            <AppBar position="static" color="rgb(182, 218, 224)" onClickCapture ={()=>{
                this.handle_close();
            }}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" 
                aria-label="menu" onClick = {this.handle_open}>
                    <MenuIcon >
                    </MenuIcon>
                </IconButton>

                
                <Typography variant="h6" className={classes.title}>
            
                </Typography>
      
                <Typography>{this.state.curr_eth_addr.substr(0, 15)}
                </Typography>
                <Jdenticon size="30" value={this.state.curr_eth_addr.substr(0, 15)} /> 

                          
                <IconButton color="inherit" onClick={this.handle_menu_open}>
               
               <AccountCircle/>
               </IconButton>


                      <Menu open = {this.state.open} 
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    anchorEl={null}
                    getContentAnchorEl={null}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                 
                    >         
        
                      <MenuItem onClick={this.handle_close}>
                      <Link  to ={{pathname: `/`}} onClick={()=>{
    
                      this.handle_logout();
                      }}  className = "navbar-brand" style={{ textDecoration: 'none', color: 'black' }} >Logout </Link>
                      </MenuItem>
                      </Menu>
     
                </Toolbar>
            </AppBar>
        </div>
        )
      }
        else{
        return (
      
          <div className="App">
              <AppBar position="static" color="rgb(182, 218, 224)" onClickCapture ={()=>{
                this.handle_close();
            }}>
                  <Toolbar >
                  <IconButton edge="start" className={classes.menuButton} color="inherit" 
                  aria-label="menu" onClick = {this.handle_open}>
                      <MenuIcon  >
                      </MenuIcon>
                  </IconButton>
  
                  {console.log("STATUS --->", this.state.login_status)}
                        <Menu open = {this.state.open} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      anchorEl={null}
                      getContentAnchorEl={null}
                      transformOrigin={{ vertical: "top", horizontal: "center" }}
                   
                      >         
                        <MenuItem onClick={this.handle_close}>
                        <Link  to ={{pathname: `/login`}} style={{ textDecoration: 'none', color: 'black' }} className = "navbar-brand" >Login </Link>                    
                        </MenuItem>
  
                        <MenuItem onClick={this.handle_close}>
                        <Link  to ={{pathname: `/register`}}  style={{ textDecoration: 'none', color: 'black'}} className = "navbar-brand" >Register </Link>
                        </MenuItem>
                        </Menu>
                     
                
                  <Typography variant="h6" className={classes.title}>
                  <Link  to ={{pathname: `/`}}   style={{ textDecoration: 'none', color: 'black' }}  className = "navbar-brand" >  Supplychain-DAPP </Link>
                    
                  </Typography>
                  </Toolbar>
              </AppBar>
          </div>
        
        );
      }
        
      
    }

    render(){
       return(
         <div>
           {this.nav_handle()}
           </div>

       )
    }
}

export default withRouter(withStyles(styles)(Navbar))
