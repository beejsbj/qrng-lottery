import ResetLottery from "./ResetLottery";
import { useState, useEffect } from "react";
import { Howl } from "howler";
import useStore from "../../store";
import stampSound from "../../assets/stamp.mp3";

export default function Lottery(props) {
  const max = 5; //total number of dials to check
  let dialsArr = Array.from(Array(50).keys());
  dialsArr = dialsArr.map((dial) => {
    return {
      number: dial + 1,
      checked: false,
    };
  });

  const [dials, setDials] = useState(dialsArr);
  const [isRolling, setIsRolling] = useState(false);
  const selectedNumbers = useStore((state) => state.numbers.selected);
  const setNumbers = useStore((state) => state.numbers.setNumbers);
  const buyTicket = useStore((state) => state.web3Demo.startTicketPurchase);
  const hasLotteryEnded = useStore((state) => state.hasLotteryEnded);

  useEffect(() => {
    setNumbers(dials.filter((dial) => dial.checked).map((dial) => dial.number));
  }, [dials]);

  const sound = new Howl({
    src: ["/click.wav"],
  });
  const stamp = new Howl({
    src: [stampSound],
    volume: 0.55,
  });

  function maxLimit() {
    const checked = dials.filter((dial) => dial.checked);
    return checked.length < max;
  }

  function resetDials() {
    const updatedDials = dials.map((dial) => ({
      ...dial,
      checked: false,
      class: "",
    }));
    setDials(updatedDials);
  }

  function removeRollClass() {
    setDials((currentDials) =>
      currentDials.map((dial) => ({ ...dial, class: "" }))
    );
  }

  function rollChecked() {
    const toChecks = getRndIntArr();
    toChecks.forEach((dialIndex, stampIndex) => {
      setTimeout(() => {
        setDials((currentDials) =>
          currentDials.map((dial, i) =>
            i === dialIndex
              ? {
                  ...dial,
                  checked: true,
                  class: `punched-slip punch-${stampIndex}`,
                }
              : dial
          )
        );
        stamp.play();
      }, stampIndex * 115);
    });
  }

  function getRndIntArr() {
    const numbers = [];
    for (let i = 0; i < max; i++) {
      let randomNum = Math.floor(Math.random() * dials.length);
      while (numbers.includes(randomNum)) {
        randomNum = Math.floor(Math.random() * dials.length);
      }
      numbers.push(randomNum);
    }
    return numbers;
  }

  //event handler
  function toggleChecked(number, event) {
    sound.play();
    if (event.target.checked && !maxLimit()) {
      alert("Can only Select " + max);
      return;
    }
    const updatedDials = dials.map((dial) => {
      if (dial.number == number) {
        return {
          ...dial,
          checked: event.target.checked,
          class: event.target.checked ? "punched-slip" : "",
        };
      }
      return dial;
    });
    setDials(updatedDials);
  }

  async function handleRoll(event) {
    event.preventDefault();

    setIsRolling(true);
    event.target.style.pointerEvents = "none";
    resetDials();

    const updatedDials = dials.map((dial) => ({
      ...dial,
      checked: false,
      class:
        dial.number % 2 == 0 ? "rotate-center" : "rotate-center-reverse",
    }));

    setDials(updatedDials);
    setTimeout(rollChecked, 720);
    setTimeout(() => {
      removeRollClass();
      event.target.style.pointerEvents = "auto";
      setIsRolling(false);
    }, 1450);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedNumbers.length < max) {
      buyTicket();
      return;
    }
    buyTicket();
  }

  return (
    <lottery-module
      class={`${
        hasLotteryEnded ? "lottery-ended slide-in-right" : "slide-in-right"
      }`}
    >
      <ResetLottery shakeConnectButton={props.shakeConnectButton} />
      <form>
        <ul className={isRolling ? "dial-board is-rolling" : "dial-board"}>
          {dials.map((dial) => (
            <li key={`dialKey-${dial.number}`}>
              <input
                type="checkbox"
                id={`dial-${dial.number}`}
                className="dials"
                checked={dial.checked}
                onChange={(event) => {
                  toggleChecked(dial.number, event);
                }}
              />
              <label
                htmlFor={`dial-${dial.number}`}
                className={dial.class}
                //  onMouseEnter={() => sound.play()}
                //  onMouseLeave={() => sound.pause()}
              >
                <span>{dial.number}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button
            className={`roll attention-voice button`}
            onClick={handleRoll}
          >
            ROLL
          </button>
          <button
            className="submit attention-voice button contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </lottery-module>
  );
}
