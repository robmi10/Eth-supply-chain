import Web3 from "web3";
import {HTTP_PROVIDER} from './config.js'

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    console.log("GETWEB -> 1")
    window.addEventListener("load", async () => {
      // Modern dapp browsers...

      console.log("GETWEB -> 2")
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        console.log("GETWEB-> 3")
        try {
          // Request account access if needed
          console.log("GETWEB -> 4")
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log("GETWEB -> 5")
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          HTTP_PROVIDER
        );
        console.log("GETWEB -> 6");
        const web3 = new Web3(provider);
        console.log("GETWEB -> 7");
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
