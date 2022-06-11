import axios from "axios"
import { useState } from "react";

function Box(props) {

    const [first, setfirst] = useState(second)

    axios.post('https://api.thegraph.com/subgraphs/name/vince0656/brand-central',{
        query:
        `{
        ticker(id:"${props.tick}") {
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
        console.log(res.data.data.ticker)
        
        
    })
    
    
    return (
        <div>
            <li>ticker:{props.tick} </li>
            <img src={props.img} />
            <li>      </li>
        </div>
    );
}

export default Box;


