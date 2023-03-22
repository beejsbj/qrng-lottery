import useStore from "../../store";

export default function ResetLottery(props) {
  const nbsp = "\u00A0";
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);
  const resetLottery = useStore((state) => state.reset.writeContract);

  async function handleReset(event) {
    event.preventDefault();
    if (props.buttonDisabled) {
      props.shakeConnectButton();
      return;
    }
    await resetLottery();
  }

  return (
    <div className={`${hasLotteryEnded ? "reset-lottery" : "hide"}`}>
      <h2 className="attention-voice">
        Lottery{nbsp}has{nbsp}ended
      </h2>
      <button
        onClick={handleReset}
        className={`button ${props.buttonDisabled}`}
      >
        Reset{nbsp}Lottery
      </button>
    </div>
  );
}
