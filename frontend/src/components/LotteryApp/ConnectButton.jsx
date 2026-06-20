import useStore from "../../store";

function shortAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ConnectButton() {
  const nbsp = "\u00A0";
  const wallet = useStore((state) => state.web3Demo.wallet);
  const openConnectPrompt = useStore(
    (state) => state.web3Demo.openConnectPrompt
  );
  const disconnectWallet = useStore((state) => state.web3Demo.disconnectWallet);

  return (
    <div
      className={
        wallet.status === "connected"
          ? "wallet-wrapper slide-in-top-bar"
          : "connect-wrapper"
      }
    >
      {wallet.status !== "connected" && (
        <button
          className="button connect"
          onClick={openConnectPrompt}
          type="button"
        >
          Connect{nbsp}Wallet{nbsp}to{nbsp}Play!!
        </button>
      )}

      {wallet.status === "connected" && (
        <>
          <button className="button picture" type="button">
            {wallet.chainName}
          </button>
          <button className="button" onClick={disconnectWallet} type="button">
            {shortAddress(wallet.address)}
            <span className="balance">({wallet.balance})</span>
          </button>
        </>
      )}
    </div>
  );
}
