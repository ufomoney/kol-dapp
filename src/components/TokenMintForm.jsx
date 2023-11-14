import React, { useRef, useState } from "react";

const num = 1.5;

export default function TokenMintForm({ contract, address }) {
  const [tokenStakedAmount, setTokenStakedAmount] = useState(0);
  const tokenAmountRef = useRef(tokenStakedAmount);

  const changeTokenAmount = (event) =>
    setTokenStakedAmount(+event.currentTarget.value.replace(/[^0-9]+/g, ""));

  const mint = async () => {
    // const cost = await contract.methods.cost().call();
    // console.log(contract.methods);
    //   contract.methods
    //     .mint(tokenStakedAmount)
    //     .send({ from: address, value: Number(cost) * tokenStakedAmount })
    //     .then(console.log);
    console.log(tokenAmountRef);
  };

  return (
    <div className="mint_form">
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
          <label htmlFor="#inp_text" className="label_name">
            <span className="content_name">Enter the amount</span>
          </label>
        </div>
        <div>⬇️</div>
        <h3 className="converted">
          {tokenStakedAmount ? tokenStakedAmount * num : ""}
        </h3>
      </div>

      <button className="main__btn_mint" onClick={mint}>
        Mint
      </button>
    </div>
  );
}
