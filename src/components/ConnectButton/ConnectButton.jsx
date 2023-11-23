import { useWeb3Modal } from "@web3modal/ethers5/react";

export default function ConnectButton({ addClick, isConnected }) {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  function handler() {
    addClick();
    if (isConnected) return;
    open();
  }

  return (
    <>
      <button className="main__btn" onClick={handler}>
        Connect Wallet
      </button>
      {/* <button className="main__btn" onClick={() => open({ view: "Networks" })}>
        Open Network Modal
      </button> */}
    </>
  );
}
