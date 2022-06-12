import contractABI from "../abi/contract.json"
import React, { useState,useEffect } from 'react';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
//import Footer from "../components/Footer";

//import styled from "styled-components"
import axios from "axios";




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
  const [toggleState, setToggleState] = useState(1);
  const [blockheight, setblockheight] = useState(null)
  const [Tk, setTk] = useState([])

  useEffect(() => {
    
    fetch('https://api.covalenthq.com/v1/1/block_v2/latest/?quote-currency=USD&format=JSON&key=ckey_62dc169a991f4d7ebe7dd52afef')
    .then((r) => r.json())
    .then((res) => {
      console.log(res.data.items[0].height)
      setblockheight(res.data.items[0].height)
    })
    
  }, [info])
  
  const toggleTab = (index) => {
    setToggleState(index);
  };

  //let authenticated = false
  

  

  
  //const info = []
  
  const ff = async() => {

    
    const web3Modal = new Web3Modal({
      providerOptions, // required
      //displayNoInjectedProvider: true,
      //disableInjectedProvider: true,
    });
    
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

    
      axios.post('https://api.thegraph.com/subgraphs/name/vince0656/brand-central',{
        query:
        `{
        tickers {
            id
            shbBid
            bidder
            biddingEnd
            numberOfBidsReceived
            nftClaimed
          }
        }
        `
    }).then((res) => {
        //console.log(res.data.data.tickers)
  
        setTk(res.data.data.tickers)
  
  
        res.data.data.tickers.map((f,i) => {
          //console.log(f)
  
          let nftContract = new web3.eth.Contract(contractABI, "0x4EA67AeBb61f7Ff6E15E237C8b79D29C41F750fd")
          nftContract.methods.lowerTickerToTokenId(f.id).call()
          .then((r) => {
            fetch('https://eth-mainnet.alchemyapi.io/v2/__ek_W2lxQBecS34JNKFLtQ__5ZYr1S6/getNFTsForCollection/?contractAddress=0x4ea67aebb61f7ff6e15e237c8b79d29c41f750fd&startToken=1&withMetadata=true')
            .then((r) => r.json())
          //  console.log(r)
          console.log(r)
          
          //info[r]  = (data.nfts[i-1].media[0]).raw
          })
        
        })
    })


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

    const web3Modal = new Web3Modal({
      providerOptions, // required
      //displayNoInjectedProvider: true,
      //disableInjectedProvider: true,
    });
    
    setauth(false)
    setacc("")
    console.log(acc)

    web3Modal.clearCachedProvider();

    //console.log(auth)
  }

  


  //console.log(Tk)




  return (
    <>
      

      
      <div className="cc ">

      <div className="navb nes-container is-rounded">
        <div className="title">
        <a href="#" ><img src="https://brand.blockswap.network/static/media/logo-black.13afc5b5.svg"/></a>
        
        
        <button className="nes-btn " type="button" onClick={ff}>My Account</button>
        </div>
      </div>

      <div className="bodd">
          
          <div className="nes-container is-rounded upg" >
            <div className="bigtext">Brand Central Auction</div>
            <div className="twoway">
                <div className="lside">
                  <div className="ulist">
                    <li>Blockswap is giving the first opportunity to claim a StakeHouse name on mainnet to SHB holders.</li>
                    <li>The auction will run for 5 days.</li>
                    <li>Each day 10 StakeHouse names can be proposed on a first come first serve basis.</li>
                  </div>
                </div>
                <div className="rside">
                  <div className="ulist">
                    <li>In the last 200 blocks (approx 50 minutes) each additional bid will increase the time remaining by 100 blocks (approx 25 minutes) until someone loses the battle.</li>
                    <li>Minimum Bid increase is 2 SHB.</li>
                    <li>Additional details on the auction <a href="https://blog.blockswap.network/brand-central-auction-how-to-guide-3ac1f66564db">here</a>. Read <a href="https://blockswap.notion.site/blockswap/FAQ-Brand-Central-Auction-a5924cb32a114bbba53c0b27a77e1230">FAQ</a> here.</li>
                  </div>
                </div>
            </div>
            <div className="">
            <button className="nes-btn is-disabled aucend" type="button">
                Auction has Ended
            </button>
            </div>
            
    
    
            <hr className="golden"/>
    
            <div className="tabdiv">
              <button className={toggleState === 1 ? "nes-btn active-tab" : "nes-btn tab"}
              onClick={() => toggleTab(1)}>
                Show All</button>
              <button className={toggleState === 2 ? "nes-btn active-tab" : "nes-btn tab"}
              onClick={() => toggleTab(2)}>My Tickers</button>
              <button className={toggleState === 3 ? "nes-btn active-tab" : "nes-btn tab"}
              onClick={() => toggleTab(3)}>Battle Space</button>
        
              
            </div>
    
            
    
    
            {/* <div>
              
            </div> */}
    
            
            <div className="nes-container is-rounded uppermid">
    
                <div
                  className={toggleState === 1 ? "active-content " : "content"}
                >
                  <h2>Show All</h2>
                  <hr />
                  <h3>{blockheight}</h3>

                  <h2>Show All</h2>
                  <hr />
                  <h3>{blockheight}</h3>

                  <h2>Show All</h2>
                  <hr />
                  <h3>{blockheight}</h3>

                  <h2>Show All</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  
                  
                </div>
    
                <div
                  className={toggleState === 2 ? " active-content " : "content"}
                >
                  <h2>My Ticker</h2>
                  <hr />
                  <h3>{blockheight}</h3>

                  <h2>My Ticker</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  <h2>My Ticker</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  <h2>My Ticker</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  <h2>My Ticker</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  
                  
                  
                </div>
    
                <div
                  className={toggleState === 3 ? "active-content " : "content"}
                >
                  <h2>Battle</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  <h2>Battle</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  <h2>Battle</h2>
                  <hr />
                  <h3>{blockheight}</h3>

                  <h2>Battle</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  <h2>Battle</h2>
                  <hr />
                  <h3>{blockheight}</h3>
                  
                </div>
              </div>
    
    
              {/* <footer className="end">
                <div className="nes-content foot"><a href="https://etherscan.io/address/0x4ea67aebb61f7ff6e15e237c8b79d29c41f750fd">Contract</a></div>
              </footer> */}
        </div>
    
          </div>

      </div>
    
      

      
      
    
    </>
  )
}



