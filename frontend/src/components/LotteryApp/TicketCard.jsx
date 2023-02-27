import useStore from "../../store";

export default function TicketCard() {
  const ticket = useStore((state) => state.ticket.amount);

  const setTicketAmount = useStore((state) => state.ticket.setAmount);

  function ticketDecrement() {
    if (ticket <= 1) return;
    setTicketAmount(ticket - 1);
  }

  function ticketIncrement() {
    if (ticket >= 10) return;
    setTicketAmount(ticket + 1);
  }

  return (
    <ticket-card>
      <h2 className="teaser-voice">Buy your Tickets</h2>
      <div>
        <button className="minus button attention-voice" onClick={ticketDecrement}>
          ﹣
        </button>
        <p className="ticket-box loud-voice heartbeat">{ticket}</p>
        <button className="plus button attention-voice" onClick={ticketIncrement}>
          ＋
        </button>
      </div>
    </ticket-card>
  );
}
