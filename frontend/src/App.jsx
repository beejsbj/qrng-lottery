import LotteryApp from "./components/LotteryApp/LotteryApp";
import ConnectButton from "./components/LotteryApp/ConnectButton";
import { useAccount } from "wagmi";
import Loading from "./components/LotteryApp/Loading";

function App() {
  const { isConnected } = useAccount();
  function shakeConnectButton() {
    const connectButton = document.querySelector("button.connect");
    //  scroll to top
    window.scrollTo(0, 0);
    connectButton.classList.add("wobble-hor-bottom");
    setTimeout(() => {
      connectButton.classList.remove("wobble-hor-bottom");
    }, 1000);
  }

  return (
    <div className="App">
      <main className="page-content">
        <section className="page-section">
          <ConnectButton />
          <inner-column>
            <h1 className="booming-voice slide-in-top">Lottery</h1>
            {isConnected && (
              <LotteryApp shakeConnectButton={shakeConnectButton} />
            )}
            {!isConnected && (
              <LotteryApp shakeConnectButton={shakeConnectButton} />
            )}
          </inner-column>
          <Loading />
        </section>
      </main>
      <div className="final-result hide"></div>
    </div>
  );
}

export default App;
