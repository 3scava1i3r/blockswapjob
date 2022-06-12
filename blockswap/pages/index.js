import contractABI from "../abi/contract.json"
import React, { useState,useEffect } from 'react';
import Box from "../components/Box";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import Footer from "../components/Footer";

import styled from "styled-components"




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






  return (
    <>
    <Head>
      {/* main header area */}

      <Title className='rpgui-content'>
        
        <a href="#"><img src="https://brand.blockswap.network/static/media/logo-black.13afc5b5.svg"/></a>
        
        
        <button className="rpgui-button" type="button">My Account</button>
        
      </Title>
    </Head>
      

    {/*in between stats written section */}

    
      <Bod className="rpgui-content ">

      <div className="rpgui-container framed bod" >
        <BigText>Brand Central Auction</BigText>
        <TwoWay>
            <Lside>
              <UList>
                <li>Blockswap is giving the first opportunity to claim a StakeHouse name on mainnet to SHB holders.</li>
                <li>The auction will run for 5 days.</li>
                <li>Each day 10 StakeHouse names can be proposed on a first come first serve basis.</li>
              </UList>
            </Lside>
            <Rside>
              <UList>
                <li>In the last 200 blocks (approx 50 minutes) each additional bid will increase the time remaining by 100 blocks (approx 25 minutes) until someone loses the battle.</li>
                <li>Minimum Bid increase is 2 SHB.</li>
                <li>Additional details on the auction <a href="https://blog.blockswap.network/brand-central-auction-how-to-guide-3ac1f66564db">here</a>. Read <a href="https://blockswap.notion.site/blockswap/FAQ-Brand-Central-Auction-a5924cb32a114bbba53c0b27a77e1230">FAQ</a> here.</li>
              </UList>
            </Rside>
        </TwoWay>
        
        <AucEnd className="rpgui-button" disabled type="button">
            Auction has Ended
        </AucEnd>


        <HR className="golden"/>

        <div className="tabdiv">
          <Spana className={toggleState === 1 ? "rpgui-button active-tab" : "tab"}
          onClick={() => toggleTab(1)}>
            Show All</Spana>
          <Spana className={toggleState === 2 ? "rpgui-button active-tab" : "tab"}
          onClick={() => toggleTab(2)}>My Tickers</Spana>
          <Spana className={toggleState === 3 ? "rpgui-button active-tab" : "tab"}
          onClick={() => toggleTab(3)}>Battle Space</Spana>


          

          {/* <footer className="rpgui-content">
            <div className="rpgui-container framed sf">
              <hr className="golden" />
              <div><a href="https://etherscan.io/address/0x4ea67aebb61f7ff6e15e237c8b79d29c41f750fd">Contract Link</a></div>

            </div>
          </footer> */}
          
          
        </div>

        <div className="rpgui-container framed-golden uppermid">

            <div
              className={toggleState === 1 ? "active-content " : "content"}
            >
              <h2>Show All</h2>
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
              
            </div>

            <div
              className={toggleState === 3 ? "active-content " : "content"}
            >
              <h2>Battle</h2>
              <hr />
              <h3>{blockheight}</h3>
              
              
            </div>

          </div>

        

          
         
      </div>
        
      </Bod>


      {/* <Mid className="rpgui-content framed-grey">
          <Mv>
          
          </Mv>
              
      </Mid> */}

      

    


    

    
      
    
    

    

    
    {/* <footer classname="rpgui-content">
            <Div>
                <Al href="https://etherscan.io/address/0x4ea67aebb61f7ff6e15e237c8b79d29c41f750fd">Contract</Al>
            </Div>
            
    </footer> */}
    
    
    {/* tabs to change */}

    {/* tabs underlying */}

    {/* current block info */}
    
    


    {/* footer */}

    {/* <Footer /> */}

    {/* <div className='rpgui-content container'>
      <h1>bdkjcbwhdc</h1>
      <hr className="golden"/>


    </div> */}
    
    {/* {(auth) ? (
        <div>
            <button onClick={signout}>signout</button>
      {info.map(({ticker, image}) => (
        <div> */}
            {/* <p>{ticker}'s url is {image}</p> */}
            {/* <Box tick={ticker} img={image}/> */}
        {/* </div>
        
       ))}

        </div>
        
      ):(<button onClick={ff}>Authenticate</button>)}    */}
    </>
  )
}

const Head = styled.header`
    display: flex; 
    align-items: center; 
    height: 8rem; 
    /* background-color: #34fefe; */
    width:100%;

`




const Title = styled.div`
    display: flex; 
    
    padding-left: 1.25rem;
    padding-right: 1.25rem; 
    justify-content: space-between; 
    align-items: center; 
    margin: 0 auto;
    left: 0;
    right: 0;
    width:1200px;
    max-height: 8rem;
    /* background-color : #ffffff; */
    

`

const Bod = styled.div`
    display: flex; 
    font-size: 0.92rem;
    line-height: 1.75rem; 
    flex-direction: column; 
    flex-wrap: wrap; 
    align-items: center; 
    margin-top:10rem;

    @media (min-width: 768px) { 
      flex-wrap: nowrap; 
    }

`



const BigText = styled.div`

    margin-bottom: 0.25rem; 
    margin-top: 6rem; 
    font-size: 3rem;
    line-height: 1rem; 
    font-weight: 500;

`
const TwoWay = styled.div`

    display: flex; 
    margin-left: 1rem;
    margin-right: 1rem; 
    margin-bottom: 1rem; 
    margin-top: 2.5rem; 
    flex-direction: row; 
    flex-wrap: wrap; 
    max-width:980px;

    @media (min-width: 768px) { 
      flex-wrap: nowrap; 
    }



`

const Lside = styled.div`
  margin-right : 3rem;

    
`

const Rside = styled.div`
  margin-left : 1rem;
  max-width:490px;
`



const UList = styled.div`
    margin-left: 1rem;

`


const Dbtn = styled.div`
    margin-bottom: 4rem;
`


const AucEnd = styled.button`
    display: block; 
    padding-left: 0.75rem;
    padding-right: 0.75rem; 
    padding-top: 1.0rem;
    padding-bottom: 1.25rem; 
    margin-top: 1.75rem;
    margin-bottom: 1rem;
    margin-left:auto;
    margin-right:auto; 
    font-size: 0.95rem;
    line-height: 2rem; 
    font-weight: 600; 
    justify-content: center;
    align-items: center; 
    width: 40%; 
    
    border-radius: 0.5rem; 

`


const HR = styled.hr`
    
    margin-bottom: 1rem; 
    width: 100%; 
    opacity: 0.9; 
    max-width:1480px;

`

const Mid = styled.div`
    display: block;
    position:relative;
    margin-top:40rem;
    margin-bottom: 2rem; 
    font-size: 1.05rem;
    line-height: 1.75rem; 
    justify-content: center; 
    margin-right:auto;
    margin-left:auto;
    align-items:center;
    

`

const Mv = styled.div`
    display:block;
    position:relative;
    justify-content: center; 
    margin-right:auto;
    margin-left:auto;
    align-items:center;

`

const Spana = styled.button`

    
    margin-left:07%;

`




// const Foot = styled.div`
//     display: flex; 
//     align-items: center; 
//     height: 8rem; 
// `
// const Div = styled.div`
    
//     display: flex; 
//     padding-left: 1.25rem;
//     padding-right: 1.25rem; 
//     justify-content: center; 
//     align-items: center; 


// `

// const Al = styled.a`
    
// `
