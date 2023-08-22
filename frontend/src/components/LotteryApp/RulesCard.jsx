import useStore from "../../store";

export default function RulesCard() {
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);

  return (
    <rules-card
      class={`${
        hasLotteryEnded ? "lottery-ended-rules slide-in-left" : "slide-in-left"
      }`}
    >
      <h2 className="loud-voice">Instructions</h2>
      {!hasLotteryEnded && (
        <ol>
          <li> Welcome to Demo site </li>
          <li>numbers are randomized, no real money</li>
          <li> Select/Roll and Sumbit </li>
          <li>Get Metamask to connect wallet</li>
          <li>
            <a href="https://qrng-lottery.netlify.com">
              link to the live site Live
            </a>
          </li>
        </ol>
      )}
      {hasLotteryEnded && (
        <ol>
          <li> The lottery has Ended!!! </li>
          <li> Click the button to get the results...(If it wasa real 😉) </li>
          <li>
            {" "}
            Dont forget to check your wallets to check if you won~ (If it was
            real 😉){" "}
          </li>
          <li>
            <a href="https://github.com/beejsbj/qrng-lottery">
              link to the github repo
            </a>
          </li>
        </ol>
      )}
    </rules-card>
  );
}
