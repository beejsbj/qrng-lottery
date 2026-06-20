import { useState } from "react";
import useStore from "../../store";

export default function RulesCard() {
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);
  const [isFlipped, setIsFlipped] = useState(false);

  const frontSteps = hasLotteryEnded
    ? [
        "The lottery has ended",
        "Draw a QRNG winner and print the receipt",
        "The winning number is written into contract history",
        "Review the receipt trail",
      ]
    : [
        "Choose five numbers or shake the board",
        "Set ticket count at the counter",
        "Submit and approve the demo wallet",
        "Watch the contract receipt print",
      ];

  return (
    <rules-card
      class={`${
        hasLotteryEnded ? "lottery-ended-rules slide-in-left" : "slide-in-left"
      } ${isFlipped ? "is-flipped" : ""}`}
    >
      <div className="rules-card-inner">
        <section className="rules-face rules-front">
          <header>
            <p className="ticket-kicker">manual</p>
            <h2 className="loud-voice">Instructions</h2>
          </header>
          <ol>
            {frontSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <button
            className="rules-flip"
            type="button"
            aria-pressed={isFlipped}
            onClick={() => setIsFlipped(true)}
          >
            flip for contract side
          </button>
        </section>

        <section className="rules-face rules-back">
          <header>
            <p className="ticket-kicker">contract side</p>
            <h2 className="loud-voice">What prints</h2>
          </header>
          <ol>
            <li>Wallet approval opens the paper extension</li>
            <li>Hash, value, method, and event print line by line</li>
            <li>Confirmations stamp until the receipt is ready</li>
            <li>
              <a href="https://github.com/beejsbj/qrng-lottery">
                GitHub repository
              </a>
            </li>
          </ol>
          <button
            className="rules-flip"
            type="button"
            aria-pressed={!isFlipped}
            onClick={() => setIsFlipped(false)}
          >
            flip back
          </button>
        </section>
      </div>
    </rules-card>
  );
}
