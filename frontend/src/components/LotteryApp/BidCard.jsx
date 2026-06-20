import { useEffect, useState } from "react";
import useStore from "../../store";
import TicketCard from "./TicketCard";
import AnimateOnChange from "react-animate-on-change";

export default function BidCard(props) {
  const amount = useStore((state) => state.pot.amount);
  const readContract = useStore((state) => state.pot.readContract);
  const [amountClass, setAmountClass] = useState("loud-voice heartbeat");

  useEffect(() => {
    setAmountClass("loud-voice pot-beat-change");
    setTimeout(() => {
      setAmountClass("loud-voice heartbeat");
    }, 1000);
  }, [amount]);

  useEffect(() => {
    readContract();
  }, []);

  return (
    <bid-card class="slide-in-left">
      <TicketCard />
      <text-content>
        <header>
          <p className="ticket-kicker">live pot</p>
          <h2 className="teaser-voice">current bid</h2>
        </header>
        {
          <p htmlFor="user-bid" id="current-bid" className={amountClass}>
            Ξ {amount}
          </p>
        }
        <p className="bid-note">prints into the next receipt</p>
      </text-content>
    </bid-card>
  );
}
