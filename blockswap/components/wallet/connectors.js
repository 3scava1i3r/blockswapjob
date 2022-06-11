import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const RPC_URL_1 =
  "https://mainnet.infura.io/v3/c71c53cafb3046609eccd39a0fc5e373";
const RPC_URL_5 =
  "https://goerli.infura.io//v3/c71c53cafb3046609eccd39a0fc5e373";

const RPC_URLS = {
  1: RPC_URL_1,
  5: RPC_URL_5,
};

export const walletConnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
});