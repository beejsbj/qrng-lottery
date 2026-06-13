import LotteryApp from "./components/LotteryApp/LotteryApp";
import ConnectButton from "./components/LotteryApp/ConnectButton";
import DemoWalletPanel from "./components/LotteryApp/DemoWalletPanel";
import TransactionRail from "./components/LotteryApp/TransactionRail";

function App() {
  function shakeConnectButton() {
    const connectButton = document.querySelector("button.connect");
    if (!connectButton) return;
    //  scroll to top
    window.scrollTo(0, 0);
    connectButton.classList.add("wobble-connect");
    setTimeout(() => {
      connectButton.classList.remove("wobble-connect");
    }, 1200);
  }

  return (
    <div className="App">
      <main className="page-content">
        <section className="page-section">
          <ConnectButton />
          <inner-column>
            <h1 className="booming-voice slide-in-top">Lottery</h1>
            <LotteryApp shakeConnectButton={shakeConnectButton} />
            <TransactionRail />
          </inner-column>
          <DemoWalletPanel />
        </section>
      </main>
      <div className="final-result hide"></div>
    </div>
  );
}

export default App;
