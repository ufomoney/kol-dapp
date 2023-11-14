import React, { useState } from "react";
import TokenMintForm from "./components/TokenMintForm";
import { Config } from "./components/Config";
import "./App.css";
import Web3 from "web3";

export default function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState();

  async function connect() {
    const web3A = new Web3(Config.providerUri);
    const chainId = Number(await web3A.eth.getChainId());
    console.log(web3A.eth);
    if (chainId !== Config.chainId) {
      alert("Not bsc, please change chain id");
      return;
    }

    // setContract(
    //   new web3A.eth.Contract(
    //     JSON.parse(Config.contractAbi),
    //     Config.contractAddress
    //   )
    // );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  }

  return (
    <div className="main">
      {account === "" ? (
        <button className="main__btn" onClick={connect}>
          Connect Wallet
        </button>
      ) : (
        <>
          <TokenMintForm contract={contract} address={account} />
        </>
      )}
    </div>
  );
}
