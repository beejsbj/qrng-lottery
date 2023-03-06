import { useEffect, useState } from "react";
import Store from "../../store";

export default function Loading(props) {
  const isResetLoading = Store((state) => state.reset.loadingContract);
  const [state, setState] = useState({ loadingClassname: "loading-screen" });

  useEffect(() => {
    if (isResetLoading) {
      setState({ loadingClassname: "loading-screen" });
    } else {
      setState({ loadingClassname: "loading-screen hide" });
    }
  }, [isResetLoading]);

  //animation that makes each letter of h1 bounce
  //   const letters = document.querySelectorAll("loading-screen .booming-voice");
  //   letters.forEach((letter) => {
  //     letter.addEventListener("animationend", (e) => {
  //       e.target.classList.remove("animated", "bounce");
  //     });
  //     letter.addEventListener("animationstart", (e) => {
  //       e.target.classList.add("animated", "bounce");
  //     });
  //   });

  return (
    <div className={state.loadingClassname}>
      <div className="container">
        <h1 className="booming-voice">WAAIT {isResetLoading}</h1>
        <div className="pictures">
          <picture>
            <img src="/src/assets/stars.svg" alt="" />
          </picture>
          <picture>
            <img src="/src/assets/stars.svg" alt="" />
          </picture>
          <picture>
            <img src="/src/assets/stars.svg" alt="" />
          </picture>
        </div>
      </div>
    </div>
  );
}
