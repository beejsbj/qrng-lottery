import useStore from "../../store";

export default function ResetLottery(props) {
  const nbsp = "\u00A0";
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);
  const resetLottery = useStore((state) => state.web3Demo.startDrawWinner);

  async function handleReset(event) {
    event.preventDefault();
    resetLottery();
  }

  return (
    <div className={`${hasLotteryEnded ? "reset-lottery" : "hide"}`}>
      <h2 className="attention-voice">
        Lottery{nbsp}has{nbsp}ended
      </h2>
      <button
        onClick={handleReset}
        className="button"
      >
        Reset{nbsp}Lottery
      </button>
    </div>
  );
}
