import React, { useEffect, useState } from "react";
import { Config } from "./components/Config";
import "./App.css";
import ExchangeForm from "./components/ExchangeForm";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3ModalSigner,
} from "@web3modal/ethers5/react";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import { ethers } from "ethers";

const projectId = "fbe54accfbd4f43f27590dbd654c2a4f";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://1rpc.io/sepolia",
};

// 3. Create modal
const metadata = {
  name: "Kol-dapp",
  description: "Kol-dapp site",
  url: "https://kol-dapp.vercel.app/",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

export default function App() {
  const [contract, setContract] = useState();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { signer } = useWeb3ModalSigner();

  async function connect() {
    if (chainId !== 11155111) {
      alert("Not bsc, please change chain id");
      return;
    }

    const newContract = new ethers.Contract(
      Config.contractAddress,
      Config.contractAbi,
      signer
    );

    setContract(newContract);
  }

  return (
    <div className="main">
      {!contract || !address ? (
        <ConnectButton addClick={connect} isConnected={isConnected} />
      ) : (
        <>
          <ExchangeForm contract={contract} address={address} />
        </>
      )}
    </div>
  );
}
