import { useEffect, useState } from "react";
import useStore from "../../store";

export default function PastWinners() {
  const [winners, setWinners] = useState([335, 500, 1100.11]);

  //winning number of last N weeks
  const getWinningNumbers = useStore(
    (state) => state.winner.getLastNWeeksWinningNumber
  );
  const WinningNumbers = useStore(
    (state) => state.winner.LastNWeeksWinningNumber
  );

  //winning pot of last N weeks
  const getWinningPots = useStore(
    (state) => state.winner.getLastNWeeksWinningPot
  );
  const WinningPots = useStore((state) => state.winner.LastNweeksWinningPot);

  useEffect(() => {
    getWinningNumbers();
    getWinningPots();
  }, []);

  return (
    <past-card class="slide-in-left">
      <h2 className="teaser-voice">past winners</h2>

      <ol>
        {WinningNumbers.map((WinningNumber, i) => {
          if (WinningNumber.length == 1) {
            WinningNumber = "0" + WinningNumber;
          }
          return (
            <li
              key={i}
              className={i == 0 ? "attention-voice" : "attention-voice"}
            >
              {WinningNumber} ⇒ Ξ {WinningPots[i]}
            </li>
          );
        })}
      </ol>
    </past-card>
  );
}
