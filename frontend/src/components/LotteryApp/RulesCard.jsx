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
          <li> Select 5 numbers or ROLL if Lazy </li>
          <li> Buy tickets! </li>
          <li>each is 1 MATIC, increasing total winnings</li>
          <li> Wait for the next draw </li>
          <li> Win or lose </li>
        </ol>
      )}
      {hasLotteryEnded && (
        <ol>
          <li> The lottery has Ended!!! </li>
          <li> Click the button to get the results... </li>
          <li>...and reset it for the next week!</li>
          <li> Dont forget to check your wallets to check if you won~ </li>
        </ol>
      )}
    </rules-card>
  );
}
