import React, { useRef, useState } from "react";
import { ethers } from "ethers";
import { useWeb3ModalSigner } from "@web3modal/ethers5/react";
import { Config } from "./Config";

const coefficient = 1;

export default function ExchangeForm({ contract, address }) {
  const [tokenNumber, setTokenNumber] = useState(0);
  const tokenAmountRef = useRef(tokenNumber);
  const [isApproved, setIsApproved] = useState(false);
  const { signer } = useWeb3ModalSigner();
  function convertedNumber() {
    return tokenNumber * coefficient;
  }

  const changeTokenAmount = (event) =>
    setTokenNumber(+event.currentTarget.value.replace(/[^0-9]+/g, ""));

  const handleApprove = async () => {
    try {
      if (tokenNumber === 0) return;

      const approveDone = await contract.approve(
        "0x932EDc66d15c3Ff9D5C4677303aED6ce915B71fc",
        tokenNumber * 10 ** 8
      );
      await approveDone.wait();
      setIsApproved(true);
    } catch (error) {
      console.error("Error when approving");
    }
  };

  const handleSwap = async () => {
    try {
      const newContract = new ethers.Contract(
        Config.contractAddress2,
        Config.contractAbi2,
        signer
      );

      const answer = await newContract.swapTokens(tokenNumber * 10 ** 8);
      await answer.wait();
      setIsApproved(false);
    } catch (error) {
      console.error("Error when swapping");
    }
  };

  return (
    <div className="main_form">
      <div className="container">
        <div className="form">
          <input
            id="inp_text"
            className="main__input"
            type="number"
            autoComplete="off"
            required
            ref={tokenAmountRef}
            onChange={changeTokenAmount}
          />
          <label htmlFor="inp_text" className="label_name">
            <span className="content_name">Enter the amount</span>
          </label>
        </div>
        <div>⬇️</div>
        <h3 className="converted">{tokenNumber ? convertedNumber() : ""}</h3>
      </div>
      {isApproved ? (
        <button className="main__btn_mint" onClick={handleSwap}>
          Swap
        </button>
      ) : (
        <button className="main__btn_mint" onClick={handleApprove}>
          Approve
        </button>
      )}
    </div>
  );
}
