import './App.scss';
import React from 'react';
import Navbar from './components/nav.js';
import HomeHeader from './components/home_test.js';
import Customer_home from './components/customer_scan';
import Login from './components/login.js';
import Register from './components/register.js';
import Firstpage from './components/firstpage.js';
import {BrowserRouter as  Switch, Route} from 'react-router-dom';
import Web3 from 'web3'


    class App extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          manager:{
            username: "",
            eth_address: ""
          },
          customer:{
            username: "",
            eth_address:""
          },
          curr_user: ""
        }
    }
  
    componentWillMount(){
      const metamaskInstalled = typeof window.web3 !== 'undefined'
      this.setState({metamaskInstalled,
        eth: 0xF43f364986cF9380B0B6298808BeD06CC3aAe29a
    })
      if(metamaskInstalled) {
         this.loadWeb3()
      }
    }

   
    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        alert("install metamask!!")
      }

      console.log("")
    }

    handleinputvalue = (username, eth_address)=>{
       this.setState({
        manager:{
          username: username,
          eth_address: eth_address
        },
        curr_user: username
      }) 
      localStorage.setItem('username', username, 'eth-address', eth_address);
    } 
 
    handleinputvalue_2 = (username, eth_address)=>{
      this.setState({
        customer:{
          username: username,
          eth_address: eth_address
        },
        curr_user: username
      })
      localStorage.setItem('username', username, 'eth-address', eth_address);
    }
     
      render(){
    
      return (
        <Switch>

          {console.log("INSIDE APP CUSTOMER -> ", this.state.customer.username)}

          {console.log("INSIDE APP MANAGER -> ", this.state.manager.username)}
          <Navbar manager_username = {this.state.manager.username} manager_eth_address = {this.state.manager.eth_address}
          customer_username = {this.state.customer.username} customer_eth_address = {this.state.customer.eth_address}
          ></Navbar>
        <div className="App">
          
          <Route exact path = "/" component = {Firstpage}/> 

          <Route path="/manager_home" render={props => <HomeHeader handleinputvalue = {this.handleinputvalue.bind(this)} />} />
          <Route path="/customer_home" render={props => <Customer_home handleinputvalue_2 = {this.handleinputvalue_2.bind(this)} />} />

          <Route  path = "/register" component = {Register}/>  
          <Route  path = "/login" component = {Login}/>  

        </div>
        </Switch>
      );
    }
    }
    
    export default App;