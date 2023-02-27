import { useEffect } from "react";
import useStore from "../../store";
import TicketCard from "./TicketCard";

export default function BidCard(props) {
  const amount = useStore((state) => state.pot.amount);
  const readContract = useStore((state) => state.pot.readContract);

  useEffect(() => {
    readContract();
  }, []);

  return (
    <bid-card class="slide-in-left">
      <TicketCard />
      <text-content>
        <h2 className="teaser-voice">current bid</h2>
        {
          <p htmlFor="user-bid" id="current-bid" className={`loud-voice heartbeat`}>
            Ξ {amount}
          </p>
        }
      </text-content>
    </bid-card>
  );
}
