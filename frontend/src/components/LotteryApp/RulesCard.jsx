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
          <li> Welcome to QRNG Lottery </li>
          <li> Numbers are randomized for this showcase </li>
          <li> Select or roll numbers, then submit </li>
          <li> Connect Metamask to follow the wallet flow </li>
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
              GitHub repository
            </a>
          </li>
        </ol>
      )}
    </rules-card>
  );
}
