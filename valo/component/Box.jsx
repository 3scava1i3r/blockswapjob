import Image from 'next/image'


function Box(props) {
    
    let link = `https://etherscan.io/address/${props.all.sub.bidder}`
    //console.log(props.all)
    return (
        <div className="box-out">
            
            {(!(props.all.image) == "") ? 

            <>
            <img src={props.all.image} className="card-image"/> 
            <h3>{props.all.sub.id}</h3>
            </>
            
            : <h2 className="cardimgtext">{props.all.sub.id}</h2> }
            
            <div className="nes-container is-rounded conl">
                Bid Count:{props.all.sub.numberOfBidsReceived}
                <div> winning Bid
            {props.all.sub.shbBid/1000000000000000000}
            </div>

            <div>
                End Block: {props.all.sub.biddingEnd}
            </div>
            
            <div className="longadd">Winner : <a href={link} >
                {props.all.sub.bidder}
            </a>   
            </div>

            <div>
                Time Left : Finished
            </div>
            </div>  

        </div>
    );
}

export default Box;