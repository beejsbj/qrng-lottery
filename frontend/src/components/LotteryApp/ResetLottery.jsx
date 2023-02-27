import useStore from "../../store";

export default function ResetLottery() {
  const nbsp = "\u00A0";
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);

  return (
    <div className={`${hasLotteryEnded ? "reset-lottery" : "hide"}`}>
      <h2 className="attention-voice">Lottery has ended</h2>
      <button className="button">Reset{nbsp}Lottery</button>
    </div>
  );
}
