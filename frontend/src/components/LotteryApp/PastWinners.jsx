import { useState } from "react";
import useStore from "../../store";

export default function PastWinners() {
  const [winners, setWinners] = useState([335, 500, 1100.11]);
  const getWinner = useStore((state) => state.winner.getLastWeekWinningNumber);
  const winner = useStore((state) => state.winner.lastWeekWinningNumber);
  getWinner();
  console.log(winner);
  return (
    <past-card class="slide-in-left">
      <h2 className="teaser-voice">past winners</h2>

      <ol>
        {winners.map((winner, i) => {
          return (
            <li key={i} className={i == 0 ? "loud-voice" : "attention-voice"}>
              {" "}
              {winner}{" "}
            </li>
          );
        })}
      </ol>
    </past-card>
  );
}
