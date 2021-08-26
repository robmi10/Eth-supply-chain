import '../App.scss';
import React from 'react';
import styled from 'styled-components'
import { motion } from "framer-motion";
import {Grid} from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

const Section = styled.section`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  padding: 3rem calc((100vw - 1300px) / 2);
  @media screen and (max-width: 768px) {
    grid-grid-template-columns: 1fr;
  }
`;

const ColumnLeft = styled.div`
  display: flex;
  color: rgb(0, 0, 0);;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;
  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
  p {
    margin: 2rem 0;
    font-size: 4rem;
    line-height: 1.1;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 1rem;
  border: 2px solid rgb(0, 0, 0);;
  border-radius: 4px;
 
  cursor: pointer;
  background: transparent;
  color: rgb(0, 0, 0);
`;



class Firstpage extends React.Component {


  handle_route = () =>{
    this.props.history.push(`/login`)
  }
    render(){
      const fadeLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
      }
      return (

        <div className="App"
        
        >
           <Section>
      <Container>
        <ColumnLeft>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to Supply-Chain Dapp
          </motion.h1>
          <motion.p
            variants={fadeLeft}
            initial='hidden'
            animate='visible'
            transition={{ duration: 1 }}
          >
            Enjoy decentralised Supply-Chain
          </motion.p>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              backgroundColor: '#67F6E7',
              border: 'none',
              color: '#000'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            
            onClick={this.handle_route}
            
          >
            Get Started
          </Button>
        </ColumnLeft>
          <Grid  container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    >
                      
           <motion.div
              whileHover={{ scale: 0.5, rotate: 90 }}
              whileTap={{
                scale: 0.4,
                rotate: -90,
                borderRadius: "20%"
              }}>
              <Grow in={true} style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1500 } : {})}>
            <div className = 'image'
             style={{padding: 60,}}
            >
               <img src='https://image.flaticon.com/icons/png/512/3787/3787823.png' ></img></div>
               </Grow>

               </motion.div>
               </Grid>
               </Container>
              </Section>
        </div>

      );
    }
    }
    
    export default Firstpage;