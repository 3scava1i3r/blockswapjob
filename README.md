# blockswapjob

## Initial thought ✨✨
- I had to figure out the logic between ticker and metadata as no token/image URI was given
- subgraph fetched data had tickers and contract metadata had different names
- broken URI even in contract code


## Mistakes 💫💫

- did not check subgraph enough to see 34 items there and total tokenId being just 30
- use opensea api initially which was rate limited
- switch between web3modal and web3-react, causing small bugs
- going for a logic of getting tokenids from contract address and then using that to get tickers by calling contract and then using tickers for subgraph data
- using a seven year old css library which caused me to change the entire UI



## Renders made 🏄‍♂️🏄‍♂️
- changed the enntire logic to start from subgraph
- started with fetching all data from subgraph and then using tickertotokenId to get token id from ticker recieved in the previous step,followed by using alchemi api to get necessary metatdata of image in the card.
- changing all code from web3-react and just using web3modal  for multi wallet support
- changed the UI to what i am used to



## Future plans 😇😇
- addition of a dark mode 
- more wallet support




### Initial image for UI(code in blockswap folder)

![Screenshot from 2022-06-13 01-49-38](https://user-images.githubusercontent.com/52003051/173304486-57321fdb-3f61-4001-be66-0a05dbc5e62a.png)

### final Product

![s](https://user-images.githubusercontent.com/52003051/173304924-ece37adb-5ef2-47fe-b80c-67b524fcba04.png)
