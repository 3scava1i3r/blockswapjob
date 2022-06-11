import contractABI from "../abi/contract.json"
import React, { useState } from 'react';

import Web3 from "web3";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4", // required
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: "b7d059de-0fea-4fbf-a725-143562297c30", // required
    },
  },
}


export default function Home() {
  
  const [auth, setauth] = useState(false)
  const [acc, setacc] = useState("")
  const [info, setinfo] = useState([])

  //let authenticated = false

  const web3Modal = new Web3Modal({
    providerOptions, // required
    //displayNoInjectedProvider: true,
    //disableInjectedProvider: true,
  });

  
  //const info = []
  
  const ff = async() => {

    

    
    const provider = await web3Modal.connect();
    console.log(provider)
    const web3 = new Web3(provider);
    
    //const d = web3.currentProvider.selectedAddress
    const accounts = await web3.eth.getAccounts();
    // if(web3.currentProvider === WalletConnectProvider){
    //   setacc(d.accounts[0])
    // }
    // else if(web3.currentProvider === Proxy){
    //   setacc(d.selectedAddress)
    // }
    //console.log(d)
    setacc(accounts[0])
    setauth(true)
    //console.log(acc)

    fetch('https://eth-mainnet.alchemyapi.io/v2/__ek_W2lxQBecS34JNKFLtQ__5ZYr1S6/getNFTsForCollection/?contractAddress=0x4ea67aebb61f7ff6e15e237c8b79d29c41f750fd&startToken=1&withMetadata=true')
    .then((r) => r.json())
    .then((data) => {
      let nftContract = new web3.eth.Contract(contractABI, "0x4EA67AeBb61f7Ff6E15E237C8b79D29C41F750fd")
    
      //data.nfts
      
      for (let i = 1; i <= 30; i++) {
        
        // nftContract.methods.tokenIdToLowerTicker.call(i ,(e,res) => {
        //   console.log(res)
        // })
        
        //console.log(data.nfts[i-1])
        //console.log(i)
        nftContract.methods.tokenIdToLowerTicker(i).call()
        .then((r) => {
        //  console.log(r)
        info[i] = {ticker: r, image:(data.nfts[i-1].media[0]).raw}
        
        //info[r]  = (data.nfts[i-1].media[0]).raw
        })
        //.then(() => console.log(info))
      }

     
    })
      
    console.log(info)
    
    
    //console.log(typeof(info))
    
    
  }
  console.log(info)

  // const listItem = info.map((r) => {
  //   return (
  //     <div>
  //       <li>{r.ticker}</li>
  //       <li>{r.image}</li>
  //     </div>
  //   )
    
  // })

  console.log(acc)
  const signout = () => {
    
    setauth(false)
    setacc("")
    console.log(acc)

    web3Modal.clearCachedProvider();

    //console.log(auth)
  }
  

  return (
    <>
    lksdnc
    
    {(auth) ? 
      (
        <div>
            <button onClick={signout}>signout</button>
      {info.map(({ticker, image}) => (
        <p>{ticker}'s url is {image}</p>
       ))}

        </div>
        
      )
      
      
      :(
      <button onClick={ff}>Authenticate</button>
      )}
    </>
  )
}
